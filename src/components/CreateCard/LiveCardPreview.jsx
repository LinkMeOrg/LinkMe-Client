// src/components/CreateCard/LiveCardPreview.jsx
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

// ==================== UTILITY FUNCTIONS ====================
function generateProfileUrl(name) {
  if (!name || !name.trim()) {
    return "https://linkme.io/your-smart-identity";
  }

  const slug = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return `https://linkme.io/${slug}`;
}

function getTemplateBackground(selectedTemplate, currentProfile) {
  // If AI background exists, use it
  if (currentProfile.aiBackground) {
    return {
      background: `url(${currentProfile.aiBackground}) center/cover`,
    };
  }

  // Manual mode with specific templates
  if (
    currentProfile.designMode === "manual" &&
    selectedTemplate !== "glass" &&
    selectedTemplate !== "dark"
  ) {
    return {
      background: currentProfile.color,
    };
  }

  // Return empty object for gradient/glass/dark templates to use CSS classes
  return {};
}

function getTemplateClassName(selectedTemplate, hasAiBackground) {
  if (hasAiBackground) {
    return "";
  }

  const templates = {
    gradient:
      "bg-gradient-to-br from-brand-primary/90 via-[#0B0F19] to-[#16203A]",
    glass: "bg-white/80",
    modern: "bg-brand-primary",
  };

  return templates[selectedTemplate] || templates.modern;
}

// ==================== CARD PREVIEW COMPONENT ====================
function CardPreview({
  profileType,
  currentProfile,
  selectedTemplate,
  profileUrl,
}) {
  const isPersonal = profileType === "personal";
  const backgroundStyle = getTemplateBackground(
    selectedTemplate,
    currentProfile
  );
  const templateClass = getTemplateClassName(
    selectedTemplate,
    !!currentProfile.aiBackground
  );

  return (
    <div
      className={`relative w-80 h-48 md:w-[360px] md:h-[210px] rounded-[24px] shadow-card border border-gray-200 overflow-hidden transition-all ${templateClass}`}
      style={backgroundStyle}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-5 py-4 text-white">
        {/* Header with logo/avatar */}
        <div className="flex items-center gap-3">
          {currentProfile.image ? (
            <img
              src={currentProfile.image}
              alt="avatar"
              className={`w-12 h-12 ${
                isPersonal ? "rounded-full" : "rounded-lg"
              } border-2 border-white/80 object-cover`}
            />
          ) : (
            <div
              className={`w-12 h-12 flex items-center justify-center text-xl bg-white/20 border border-white/40 ${
                isPersonal ? "rounded-full" : "rounded-lg"
              }`}
            >
              {isPersonal ? "👤" : "🏢"}
            </div>
          )}

          <div>
            <p className="text-sm font-semibold opacity-90">Dot LinkMe</p>
            <p className="text-xs opacity-70">Smart NFC Digital Identity</p>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-0.5">
          <h3 className="text-lg font-bold tracking-tight">
            {currentProfile.name || (isPersonal ? "Your Name" : "Company Name")}
          </h3>
          <p className="text-xs opacity-85">
            {currentProfile.title ||
              (isPersonal ? "Your role or title" : "Your industry")}
          </p>
          <p className="text-[11px] opacity-75 mt-1 line-clamp-2">
            {currentProfile.bio ||
              "This is a preview of your smart identity card. Add a short bio or description here."}
          </p>
        </div>

        {/* Footer with tags and QR */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-[10px] opacity-80">
            <span className="px-2 py-1 rounded-full bg-black/15">
              {isPersonal ? "Personal" : "Business"}
            </span>
            <span className="px-2 py-1 rounded-full bg-black/15">
              NFC • QR • Smart Link
            </span>
          </div>

          <div className="bg-white rounded-md p-1 shadow-sm">
            <QRCodeCanvas value={profileUrl} size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN LIVE PREVIEW COMPONENT ====================
export default function LiveCardPreview({
  profileType,
  currentProfile,
  selectedTemplate,
}) {
  const profileUrl = generateProfileUrl(currentProfile.name);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(profileUrl);
  };

  return (
    <div
      className="space-y-6 lg:sticky lg:top-28 lg:flex-[1] min-w-0"
      data-aos="fade-left"
    >
      <div className="card-glass p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide">
              Live Preview
            </p>
            <p className="text-sm text-gray-500">
              This is how your Dot LinkMe card will look.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-brand-primary/5 text-[11px] font-medium text-brand-primary">
            {profileType === "personal" ? "Personal" : "Business"} Card
          </span>
        </div>

        <div className="flex justify-center">
          <CardPreview
            profileType={profileType}
            currentProfile={currentProfile}
            selectedTemplate={selectedTemplate}
            profileUrl={profileUrl}
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3">
          <div>
            <p className="text-xs font-medium text-gray-600">
              Your smart link (preview)
            </p>
            <p className="text-xs text-gray-800 truncate max-w-[220px]">
              {profileUrl}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopyUrl}
            className="btn-ghost-clean text-xs px-3 py-1.5"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="card-glass p-4 text-xs text-gray-600 space-y-1">
        <p className="font-semibold text-brand-dark">Pro Tip</p>
        <p>
          Create both profiles to separate your personal and professional life.
        </p>
      </div>
    </div>
  );
}
