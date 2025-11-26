import React, { useEffect } from "react";
import BasicInfoSection from "./BasicInfoSection";
import TemplateSelector from "./TemplateSelector";
import DesignModeSection from "./DesignModeSection";
import SocialLinksSection from "./SocialLinksSection";
import { User, Briefcase, Zap, Rocket, Plus, Loader2 } from "lucide-react";

export default function ProfileForm({
  profileType,
  currentProfile,
  updateProfile,
  socialLinks,
  onSocialLinksChange,
  selectedTemplate,
  onTemplateChange,
  templates,
  onSubmit,
  onSwitchProfile,
  loading,
}) {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const wasDataRestored = localStorage.getItem(
          "createCardFormDataRestored"
        );

        if (wasDataRestored === "true") {
          localStorage.removeItem("createCardFormDataRestored");
          return;
        }
        const API_URL = import.meta.env.VITE_API_URL; // For Vite

        const response = await fetch(`${API_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!currentProfile.name) {
          const fullName = [data.firstName, data.secondName, data.lastName]
            .filter(Boolean)
            .join(" ");

          updateProfile({
            name: fullName || "",
            firstName: data.firstName || "",
            secondName: data.secondName || "",
            lastName: data.lastName || "",
          });
        }

        if (data.email && !socialLinks.email) {
          onSocialLinksChange("email", data.email);
        }
        if (data.phoneNumber && !socialLinks.phone) {
          onSocialLinksChange("phone", data.phoneNumber);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payloadSocialLinks = Object.entries(socialLinks)
      .filter(
        ([key, value]) =>
          value && key !== "phone_code" && key !== "whatsapp_code"
      )
      .map(([key, value]) => {
        if (key === "phone") {
          const code = socialLinks["phone_code"] || "+962";
          return {
            platform: "phone",
            url: `${code} ${value}`,
          };
        }
        if (key === "whatsapp") {
          const code = socialLinks["whatsapp_code"] || "+962";
          return {
            platform: "whatsapp",
            url: `${code} ${value}`,
          };
        }
        return {
          platform: key,
          url: value,
        };
      });

    onSubmit({ ...currentProfile, socialLinks: payloadSocialLinks });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-glass p-6 md:p-8 space-y-6 lg:flex-[1.35] min-w-0"
      data-aos="fade-right"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-xl md:text-2xl font-bold text-brand-dark flex items-center gap-2">
          <span>
            {profileType === "personal" ? (
              <User className="w-5 h-5" />
            ) : (
              <Briefcase className="w-5 h-5" />
            )}
          </span>
          {profileType === "personal"
            ? "Personal Information"
            : "Business Information"}
        </h2>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-primary/10 to-purple-500/10 text-brand-primary border border-brand-primary/20 flex items-center gap-1">
          <Zap className="w-3 h-3" /> Live preview →
        </span>
      </div>

      <BasicInfoSection
        profileType={profileType}
        currentProfile={currentProfile}
        updateProfile={updateProfile}
      />

      <TemplateSelector
        templates={templates}
        selectedTemplate={selectedTemplate}
        onTemplateChange={onTemplateChange}
      />

      <DesignModeSection
        currentProfile={currentProfile}
        updateProfile={updateProfile}
      />

      <SocialLinksSection
        socialLinks={socialLinks}
        onSocialLinksChange={onSocialLinksChange}
      />

      <div className="pt-4 space-y-3">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary-clean w-full py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              Creating Your Card...
            </span>
          ) : (
            <span className="flex items-center gap-1 justify-center">
              <Rocket className="w-4 h-4" /> Generate my{" "}
              {profileType === "personal" ? "Personal" : "Business"} Card
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={onSwitchProfile}
          disabled={loading}
          className="btn-ghost-clean w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 justify-center"
        >
          <Plus className="w-4 h-4" /> Also create{" "}
          {profileType === "personal" ? "Business" : "Personal"} profile
        </button>
      </div>
    </form>
  );
}
