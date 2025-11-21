import React, { useEffect } from "react";

const SOCIAL_PLATFORMS = [
  { key: "website", label: "Website", placeholder: "https://yoursite.com" },
  { key: "linkedin", label: "LinkedIn", placeholder: "Your LinkedIn URL" },
  { key: "instagram", label: "Instagram", placeholder: "Your Instagram link" },
  { key: "twitter", label: "Twitter", placeholder: "Your Twitter link" },
  { key: "github", label: "GitHub", placeholder: "Your GitHub link" },
  { key: "whatsapp", label: "WhatsApp", placeholder: "Your WhatsApp link" },
  { key: "email", label: "Email", placeholder: "hello@example.com" },
  { key: "phone", label: "Phone", placeholder: "+962 7X XXX XXXX" },
];

const countryCodes = [
  { name: "Jordan", code: "+962", shortcut: "JO" },
  { name: "Saudi Arabia", code: "+966", shortcut: "SA" },
  { name: "UAE", code: "+971", shortcut: "AE" },
  { name: "Qatar", code: "+974", shortcut: "QA" },
  { name: "Kuwait", code: "+965", shortcut: "KW" },
  { name: "USA", code: "+1", shortcut: "US" },
  { name: "UK", code: "+44", shortcut: "GB" },
  { name: "Canada", code: "+1", shortcut: "CA" },
  { name: "Australia", code: "+61", shortcut: "AU" },
  { name: "Germany", code: "+49", shortcut: "DE" },
  { name: "France", code: "+33", shortcut: "FR" },
  { name: "Italy", code: "+39", shortcut: "IT" },
  { name: "Spain", code: "+34", shortcut: "ES" },
  { name: "Netherlands", code: "+31", shortcut: "NL" },
  { name: "Sweden", code: "+46", shortcut: "SE" },
  { name: "Norway", code: "+47", shortcut: "NO" },
  { name: "Denmark", code: "+45", shortcut: "DK" },
  { name: "Finland", code: "+358", shortcut: "FI" },
  { name: "Brazil", code: "+55", shortcut: "BR" },
  { name: "Mexico", code: "+52", shortcut: "MX" },
  { name: "Argentina", code: "+54", shortcut: "AR" },
  { name: "South Africa", code: "+27", shortcut: "ZA" },
  { name: "India", code: "+91", shortcut: "IN" },
  { name: "China", code: "+86", shortcut: "CN" },
  { name: "Japan", code: "+81", shortcut: "JP" },
  { name: "South Korea", code: "+82", shortcut: "KR" },
  { name: "Singapore", code: "+65", shortcut: "SG" },
  { name: "New Zealand", code: "+64", shortcut: "NZ" },
  { name: "Russia", code: "+7", shortcut: "RU" },
  { name: "Turkey", code: "+90", shortcut: "TR" },
  { name: "Egypt", code: "+20", shortcut: "EG" },
  { name: "Morocco", code: "+212", shortcut: "MA" },
  { name: "Nigeria", code: "+234", shortcut: "NG" },
  { name: "Kenya", code: "+254", shortcut: "KE" },
  { name: "Pakistan", code: "+92", shortcut: "PK" },
  { name: "Bangladesh", code: "+880", shortcut: "BD" },
  { name: "Thailand", code: "+66", shortcut: "TH" },
  { name: "Vietnam", code: "+84", shortcut: "VN" },
  { name: "Philippines", code: "+63", shortcut: "PH" },
  { name: "Malaysia", code: "+60", shortcut: "MY" },
];

const DEMO_AI_IMAGES = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=800&q=80",
];

function FormField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 3,
  type = "text",
  helperText,
}) {
  const baseClasses =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 transition-shadow";

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}

function ImageUpload({ label, onChange, helperText }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-primary/5 file:text-brand-primary hover:file:bg-brand-primary/10 file:cursor-pointer transition-colors"
      />
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}

function BasicInfoSection({ profileType, currentProfile, updateProfile }) {
  const isPersonal = profileType === "personal";

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    updateProfile({ image: url, imageFile: file });
  };

  return (
    <>
      <FormField
        label={isPersonal ? "Full Name" : "Company Name"}
        value={currentProfile.name}
        onChange={(value) => updateProfile({ name: value })}
        placeholder={isPersonal ? "Hala Al-Issawi" : "Dot LinkMe Solutions"}
      />

      <FormField
        label={isPersonal ? "Title / Role" : "Industry / Category"}
        value={currentProfile.title}
        onChange={(value) => updateProfile({ title: value })}
        placeholder={
          isPersonal
            ? "QA Engineer – NFC Systems"
            : "Smart NFC & Digital Identity"
        }
      />

      <FormField
        label={isPersonal ? "Short Bio" : "Description"}
        value={currentProfile.bio}
        onChange={(value) => updateProfile({ bio: value })}
        placeholder={
          isPersonal
            ? "Passionate about building clean, smart, and user-friendly systems."
            : "We help you turn your physical card into a smart NFC-powered identity."
        }
        multiline
        rows={3}
      />

      <ImageUpload
        label={isPersonal ? "Profile Image" : "Company Logo"}
        onChange={handleImageUpload}
        helperText="Recommended: square image (1:1) for best preview."
      />
    </>
  );
}

function TemplateSelector({ templates, selectedTemplate, onTemplateChange }) {
  return (
    <div className="space-y-2 pt-2">
      <label className="text-sm font-medium text-gray-700">Card Template</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onTemplateChange(template.id)}
            className={`border rounded-xl px-3 py-2 text-left text-xs hover:border-brand-primary/60 transition-all ${
              selectedTemplate === template.id
                ? "border-brand-primary bg-brand-primary/5 shadow-sm"
                : "border-gray-200 hover:shadow-sm"
            }`}
          >
            <p className="font-semibold text-[13px] text-brand-dark">
              {template.name}
            </p>
            <p className="text-[11px] text-gray-500">{template.preview}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ColorPicker({ color, onChange }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-8 rounded-md border border-gray-300 cursor-pointer"
        />
        <span className="text-xs text-gray-600">Main accent color</span>
      </div>
      <span className="text-[11px] text-gray-500">
        Use your brand color or keep LinkMe blue.
      </span>
    </div>
  );
}

function AIDesignPanel({ aiPrompt, onPromptChange, onGenerate }) {
  const handleGenerate = () => {
    const randomImage =
      DEMO_AI_IMAGES[Math.floor(Math.random() * DEMO_AI_IMAGES.length)];
    onGenerate(randomImage);
  };

  return (
    <div className="rounded-xl bg-brand-primary/5 border border-brand-primary/20 p-3 space-y-2">
      <input
        type="text"
        value={aiPrompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="e.g. Soft blue gradient with subtle glow"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/40 bg-white"
      />
      <button
        type="button"
        onClick={handleGenerate}
        className="btn-primary-clean w-full py-2 text-sm"
      >
        🔮 Preview AI background
      </button>
      <p className="text-[11px] text-gray-500">
        For now this uses demo backgrounds to simulate AI design.
      </p>
    </div>
  );
}

function DesignModeSection({ currentProfile, updateProfile }) {
  return (
    <div className="space-y-3 pt-2">
      <label className="text-sm font-medium text-gray-700">Design Mode</label>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => updateProfile({ designMode: "manual" })}
          className={`btn-ghost-clean flex-1 min-w-[130px] transition-all ${
            currentProfile.designMode === "manual"
              ? "bg-brand-primary text-white border-brand-primary"
              : ""
          }`}
        >
          🎨 Manual
        </button>
        <button
          type="button"
          onClick={() => updateProfile({ designMode: "ai" })}
          className={`btn-ghost-clean flex-1 min-w-[130px] transition-all ${
            currentProfile.designMode === "ai"
              ? "bg-brand-primary text-white border-brand-primary"
              : ""
          }`}
        >
          ✨ AI-Assisted
        </button>
      </div>

      {currentProfile.designMode === "manual" && (
        <ColorPicker
          color={currentProfile.color}
          onChange={(color) => updateProfile({ color })}
        />
      )}

      {currentProfile.designMode === "ai" && (
        <AIDesignPanel
          aiPrompt={currentProfile.aiPrompt}
          onPromptChange={(aiPrompt) => updateProfile({ aiPrompt })}
          onGenerate={(aiBackground) => updateProfile({ aiBackground })}
        />
      )}
    </div>
  );
}

function SocialLinksSection({ socialLinks, onSocialLinksChange }) {
  const [errors, setErrors] = React.useState({});

  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;

  return (
    <div className="pt-4 border-t border-gray-200 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-brand-dark">
          Social Links & Contact
        </h3>
        <span className="text-[11px] text-gray-500">
          Optional, but recommended for better networking.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SOCIAL_PLATFORMS.map((platform) => {
          const shouldValidateUrl =
            platform.key !== "email" && platform.key !== "phone";

          if (platform.key === "phone") {
            // Phone input with country code select
            return (
              <div key={platform.key} className="space-y-1">
                <label className="text-[11px] font-medium text-gray-600 capitalize">
                  {platform.label}
                </label>
                <div className="flex gap-2">
                  <select
                    value={socialLinks[`${platform.key}_code`] || "+962"}
                    onChange={(e) =>
                      onSocialLinksChange(
                        `${platform.key}_code`,
                        e.target.value
                      )
                    }
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.shortcut} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={socialLinks[platform.key] || ""}
                    onChange={(e) =>
                      onSocialLinksChange(platform.key, e.target.value)
                    }
                    placeholder={platform.placeholder}
                    className="w-full rounded-lg px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                  />
                </div>
              </div>
            );
          }

          // All other social links (with URL validation except email)
          return (
            <div key={platform.key} className="space-y-1">
              <label className="text-[11px] font-medium text-gray-600 capitalize">
                {platform.label}
              </label>
              <input
                type="text"
                value={socialLinks[platform.key] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  let isValid = true;

                  if (shouldValidateUrl && value.trim().length > 0) {
                    isValid = urlRegex.test(value.trim());
                  }

                  onSocialLinksChange(platform.key, value);

                  setErrors((prev) => ({
                    ...prev,
                    [platform.key]: !isValid,
                  }));
                }}
                placeholder={platform.placeholder}
                className={`w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2
                  ${
                    errors[platform.key]
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-200 focus:ring-brand-primary/40"
                  }`}
              />
              {errors[platform.key] && (
                <p className="text-[11px] text-red-500">
                  Please enter a valid URL (http or https)
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

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

        const response = await fetch("http://localhost:4000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        // Only set if currentProfile.name is empty to avoid overwriting user edits
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

        // Only set email and phone if they're empty
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
  }, []); // Only run once on mount

  // ✅ New submit handler to transform socialLinks
  const handleSubmit = (e) => {
    e.preventDefault();

    const payloadSocialLinks = Object.entries(socialLinks)
      .filter(([key, value]) => value && key !== "phone_code") // ignore phone_code key
      .map(([key, value]) => {
        if (key === "phone") {
          const code = socialLinks["phone_code"] || "+962";
          return {
            platform: "phone",
            url: `${code} ${value}`,
          };
        }
        return {
          platform: key,
          url: value,
        };
      });

    // Call original onSubmit with transformed socialLinks
    onSubmit({ ...currentProfile, socialLinks: payloadSocialLinks });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-glass p-6 md:p-8 space-y-6 lg:flex-[1.35] min-w-0"
      data-aos="fade-right"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-brand-dark">
          {profileType === "personal"
            ? "Personal Information"
            : "Business Information"}
        </h2>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary">
          Live preview on the right →
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
          className="btn-primary-clean w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Creating..."
            : `🚀 Generate my ${
                profileType === "personal" ? "Personal" : "Business"
              } Card`}
        </button>
        <button
          type="button"
          onClick={onSwitchProfile}
          disabled={loading}
          className="btn-ghost-clean w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ➕ Also create {profileType === "personal" ? "Business" : "Personal"}{" "}
          profile
        </button>
      </div>
    </form>
  );
}
