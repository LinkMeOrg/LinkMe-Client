import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

import CreateCardHero from "../components/CreateCard/CreateCardHero";
import ProfileTypeSwitch from "../components/CreateCard/ProfileTypeSwitch";
import ProfileForm from "../components/CreateCard/ProfileForm";
import LiveCardPreview from "../components/CreateCard/LiveCardPreview";

import Swal from "sweetalert2";

const INITIAL_PERSONAL_DATA = {
  name: "",
  title: "",
  bio: "",
  color: "#0066FF",
  image: null,
  designMode: "manual",
  aiPrompt: "",
  aiBackground: null,
};

const INITIAL_BUSINESS_DATA = {
  name: "",
  title: "",
  bio: "",
  color: "#16213E",
  logo: null,
  designMode: "manual",
  aiPrompt: "",
  aiBackground: null,
};

const INITIAL_SOCIAL_LINKS = {
  website: "",
  linkedin: "",
  instagram: "",
  twitter: "",
  github: "",
  whatsapp: "",
  email: "",
  phone: "",
};

const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    preview: "Clean & professional",
    description: "A clean, professional design perfect for business cards",
  },
  {
    id: "gradient",
    name: "Gradient",
    preview: "Soft blue gradient",
    description: "Smooth gradient background with modern aesthetics",
  },
  {
    id: "glass",
    name: "Glassmorphism",
    preview: "Frosted card",
    description: "Trendy frosted glass effect with transparency",
  },
  {
    id: "dark",
    name: "Dark Mode",
    preview: "Night style",
    description: "Sleek dark theme for a bold statement",
  },
];

async function createProfile(profileData, token) {
  const formData = new FormData();

  formData.append("profileType", profileData.profileType);
  formData.append("name", profileData.name);
  formData.append("title", profileData.title || "");
  formData.append("bio", profileData.bio || "");
  formData.append("color", profileData.color);
  formData.append("designMode", profileData.designMode);
  formData.append("template", profileData.template);

  if (profileData.aiPrompt) {
    formData.append("aiPrompt", profileData.aiPrompt);
  }

  if (profileData.aiBackground) {
    formData.append("aiBackground", profileData.aiBackground);
  }

  if (profileData.avatarFile) {
    formData.append("avatar", profileData.avatarFile);
  }

  const socialLinksArray = Object.entries(profileData.socialLinks)
    .filter(([_, value]) => value && value.trim())
    .map(([platform, url]) => ({ platform, url }));

  formData.append("socialLinks", JSON.stringify(socialLinksArray));

  const response = await fetch("http://localhost:4000/api/profiles", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response;
}

export default function CreateCard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileType, setProfileType] = useState("personal");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [personalData, setPersonalData] = useState(INITIAL_PERSONAL_DATA);
  const [businessData, setBusinessData] = useState(INITIAL_BUSINESS_DATA);
  const [socialLinks, setSocialLinks] = useState(INITIAL_SOCIAL_LINKS);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const updatePersonalData = (updates) => {
    setPersonalData((prev) => ({ ...prev, ...updates }));
  };

  const updateBusinessData = (updates) => {
    setBusinessData((prev) => ({ ...prev, ...updates }));
  };

  const updateSocialLinks = (platform, value) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: value }));
  };

  const getCurrentProfile = () => {
    const data = profileType === "personal" ? personalData : businessData;
    return {
      name: data.name,
      title: data.title,
      bio: data.bio,
      color: data.color,
      image: profileType === "personal" ? data.image : data.logo,
      designMode: data.designMode,
      aiPrompt: data.aiPrompt,
      aiBackground: data.aiBackground,
    };
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to create a profile",
        confirmButtonColor: "#060640",
      });
      navigate("/login");
      return;
    }

    const currentData =
      profileType === "personal" ? personalData : businessData;

    if (!currentData.name?.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Name is required",
        confirmButtonColor: "#060640",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await createProfile(
        {
          name: currentData.name,
          title: currentData.title,
          bio: currentData.bio,
          color: currentData.color,
          designMode: currentData.designMode,
          aiPrompt: currentData.aiPrompt,
          aiBackground: currentData.aiBackground,
          avatarFile: currentData.imageFile,
          profileType,
          socialLinks,
          template: selectedTemplate,
        },
        token
      );

      if (!res.ok) {
        const errorData = await res.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            errorData.message || "Error creating profile. Please try again.",
          confirmButtonColor: "#060640",
        });
        return;
      }

      const data = await res.json();
      Swal.fire({
        icon: "success",
        title: "Profile Created!",
        html: `${
          profileType === "personal" ? "Personal" : "Business"
        } profile created successfully! 🎉<br>Your link: <a href="/u/${
          data.data.slug
        }" class="text-blue-600 underline">View Profile</a>`,
        confirmButtonColor: "#060640",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again.",
        confirmButtonColor: "#060640",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchProfile = () => {
    setProfileType((prev) => (prev === "personal" ? "business" : "personal"));
  };

  const currentProfile = getCurrentProfile();

  return (
    <div className="min-h-screen bg-brand-light">
      <CreateCardHero />

      <section className="section-shell pb-20">
        <ProfileTypeSwitch
          profileType={profileType}
          onSwitch={setProfileType}
        />

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <ProfileForm
            profileType={profileType}
            currentProfile={currentProfile}
            updateProfile={
              profileType === "personal"
                ? updatePersonalData
                : updateBusinessData
            }
            socialLinks={socialLinks}
            onSocialLinksChange={updateSocialLinks}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            templates={TEMPLATES}
            onSubmit={handleCreateProfile}
            onSwitchProfile={handleSwitchProfile}
            loading={loading}
          />

          <LiveCardPreview
            profileType={profileType}
            currentProfile={currentProfile}
            selectedTemplate={selectedTemplate}
          />
        </div>
      </section>
    </div>
  );
}
