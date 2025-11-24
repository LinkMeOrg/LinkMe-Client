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
    icon: "✨",
  },
  {
    id: "gradient",
    name: "Gradient",
    preview: "Soft gradient flow",
    description: "Smooth gradient background with modern aesthetics",
    icon: "🌈",
  },
  {
    id: "glass",
    name: "Glassmorphism",
    preview: "Frosted glass effect",
    description: "Trendy frosted glass effect with transparency",
    icon: "💎",
  },
  {
    id: "dark",
    name: "Dark Mode",
    preview: "Bold & mysterious",
    description: "Sleek dark theme for a bold statement",
    icon: "🌙",
  },
  {
    id: "neon",
    name: "Neon",
    preview: "Vibrant & electric",
    description: "Eye-catching neon glow effects",
    icon: "⚡",
  },
  {
    id: "elegant",
    name: "Elegant",
    preview: "Sophisticated luxury",
    description: "Premium design with elegant touches",
    icon: "👑",
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
  const buildFinalLink = (platform, value) => {
    const username = value.trim();

    // If user entered a full link
    if (username.startsWith("http://") || username.startsWith("https://")) {
      return username;
    }

    switch (platform) {
      case "instagram":
        return `https://instagram.com/${username}`;
      case "linkedin":
        return `https://linkedin.com/in/${username}`;
      case "twitter":
        return `https://twitter.com/${username}`;
      case "github":
        return `https://github.com/${username}`;
      case "website":
        return `https://${username}`;
      default:
        return username;
    }
  };

  const socialLinksArray = Object.entries(profileData.socialLinks)
    .filter(([_, value]) => value && value.trim())
    .map(([platform, url]) => ({
      platform,
      url: buildFinalLink(platform, url),
    }));

  formData.append("socialLinks", JSON.stringify(socialLinksArray));
  const API_URL = import.meta.env.VITE_API_URL; // For Vite

  const response = await fetch(`${API_URL}/api/profiles`, {
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

    const savedFormData = localStorage.getItem("createCardFormData");
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);

        if (parsedData.profileType) {
          setProfileType(parsedData.profileType);
        }

        if (parsedData.selectedTemplate) {
          setSelectedTemplate(parsedData.selectedTemplate);
        }

        if (parsedData.personalData) {
          setPersonalData(parsedData.personalData);
        }

        if (parsedData.businessData) {
          setBusinessData(parsedData.businessData);
        }

        if (parsedData.socialLinks) {
          setSocialLinks(parsedData.socialLinks);
        }

        localStorage.setItem("createCardFormDataRestored", "true");
        localStorage.removeItem("createCardFormData");

        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: "Your form data has been restored. Continue where you left off!",
          confirmButtonColor: "#060640",
          timer: 3000,
        });
      } catch (error) {
        console.error("Error restoring form data:", error);
        localStorage.removeItem("createCardFormData");
      }
    }
  }, []);

  const updatePersonalData = (updates) => {
    setPersonalData((prev) => {
      const newData = { ...prev, ...updates };
      return newData;
    });
  };

  const updateBusinessData = (updates) => {
    setBusinessData((prev) => {
      const newData = { ...prev, ...updates };
      return newData;
    });
  };

  const updateSocialLinks = (platform, value) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: value }));
  };

  const getCurrentProfile = () => {
    const data = profileType === "personal" ? personalData : businessData;
    const profile = {
      name: data.name,
      title: data.title,
      bio: data.bio,
      color: data.color,
      image: data.image,
      imageFile: data.imageFile,
      designMode: data.designMode,
      aiPrompt: data.aiPrompt,
      aiBackground: data.aiBackground,
      aiGeneratedLogo: data.aiGeneratedLogo,
    };
    return profile;
  };

  const saveFormDataToLocalStorage = () => {
    const formDataToSave = {
      profileType,
      selectedTemplate,
      personalData,
      businessData,
      socialLinks,
    };
    localStorage.setItem("createCardFormData", JSON.stringify(formDataToSave));
  };

  const handleCreateProfile = async (e) => {
    const token = localStorage.getItem("token");

    if (!token) {
      saveFormDataToLocalStorage();

      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please login to create your profile. Your data will be saved!",
        confirmButtonColor: "#060640",
        confirmButtonText: "Go to Login",
        showCancelButton: true,
        cancelButtonText: "Sign Up Instead",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { returnTo: "/create-card" } });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/signup", { state: { returnTo: "/create-card" } });
        }
      });
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

      const data = await res.json();

      if (!res.ok) {
        // Extract the actual error message from the response
        let errorMessage = "Error creating profile. Please try again.";

        if (data.error) {
          // Remove "Validation error:" prefix if it exists
          errorMessage = data.error.replace(/^Validation error:\s*/i, "");
        } else if (data.message) {
          // Otherwise use the general message
          errorMessage = data.message;
        }

        // If there are validation errors array, format them
        if (data.errors && Array.isArray(data.errors)) {
          errorMessage = data.errors
            .map((err) => err.replace(/^Validation error:\s*/i, ""))
            .join(", ");
        }

        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
          confirmButtonColor: "#060640",
        });
        return;
      }

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
      console.error("Error creating profile:", err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "An unexpected error occurred. Please try again.",
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
