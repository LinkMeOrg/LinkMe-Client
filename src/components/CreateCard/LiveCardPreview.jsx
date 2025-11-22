// src/components/CreateCard/LiveCardPreview.jsx
import React, { useEffect } from "react";
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

function getTemplateStyles(selectedTemplate, currentProfile) {
  // If AI mode and has AI background, use it
  if (currentProfile.designMode === "ai" && currentProfile.aiBackground) {
    return {
      style: {
        backgroundImage: `url(${currentProfile.aiBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      className: "",
      textColor: "text-white",
      overlay: "from-black/40 to-black/20",
    };
  }

  // Manual mode - use the selected color
  if (currentProfile.designMode === "manual") {
    const color = currentProfile.color || "#2563eb";

    switch (selectedTemplate) {
      case "gradient":
        return {
          style: {
            background: `linear-gradient(135deg, ${color} 0%, ${adjustColorBrightness(
              color,
              -30
            )} 100%)`,
          },
          className: "",
          textColor: "text-white",
          overlay: "from-black/10 to-transparent",
        };

      case "glass":
        return {
          style: {
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          },
          className: "border-2 backdrop-blur-xl",
          textColor: "text-gray-800",
          borderColor: color + "40",
          overlay: null,
        };

      case "dark":
        return {
          style: {
            background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, ${color}20 100%)`,
          },
          className: "",
          textColor: "text-white",
          overlay: "from-transparent via-black/20 to-transparent",
        };

      case "neon":
        return {
          style: {
            background: `linear-gradient(135deg, #000000 0%, #1a1a2e 100%)`,
            boxShadow: `0 0 30px ${color}40, inset 0 0 50px ${color}10`,
          },
          className: `border-2`,
          textColor: "text-white",
          borderColor: color,
          overlay: null,
          glow: color,
        };

      case "elegant":
        return {
          style: {
            background: `linear-gradient(to bottom right, ${color} 0%, ${adjustColorBrightness(
              color,
              -20
            )} 50%, ${adjustColorBrightness(color, 10)} 100%)`,
          },
          className: "",
          textColor: "text-white",
          overlay: "from-white/5 to-transparent",
        };

      case "modern":
      default:
        return {
          style: {
            backgroundColor: color,
          },
          className: "",
          textColor: "text-white",
          overlay: "from-black/5 to-transparent",
        };
    }
  }

  // Default fallback
  return {
    style: {},
    className:
      "bg-gradient-to-br from-brand-primary/90 via-[#0B0F19] to-[#16203A]",
    textColor: "text-white",
    overlay: "from-black/10 to-transparent",
  };
}

// Helper function to adjust color brightness
function adjustColorBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

// ==================== CARD PREVIEW COMPONENT ====================
function CardPreview({
  profileType,
  currentProfile,
  selectedTemplate,
  profileUrl,
}) {
  const isPersonal = profileType === "personal";
  const templateStyles = getTemplateStyles(selectedTemplate, currentProfile);
  const isGlassTemplate = selectedTemplate === "glass";
  const isNeonTemplate = selectedTemplate === "neon";
  const isDarkTemplate = selectedTemplate === "dark";

  return (
    <div
      className={`relative w-80 h-48 md:w-[360px] md:h-[210px] rounded-[24px] shadow-2xl overflow-hidden transition-all duration-300 ${templateStyles.className}`}
      style={{
        ...templateStyles.style,
        ...(templateStyles.borderColor && {
          borderColor: templateStyles.borderColor,
        }),
      }}
    >
      {/* Background overlay */}
      {templateStyles.overlay && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${templateStyles.overlay}`}
        />
      )}

      {/* Neon glow effect */}
      {isNeonTemplate && templateStyles.glow && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${templateStyles.glow}, transparent)`,
              boxShadow: `0 0 20px ${templateStyles.glow}`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${templateStyles.glow}, transparent)`,
              boxShadow: `0 0 20px ${templateStyles.glow}`,
            }}
          />
        </>
      )}

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col justify-between px-5 py-4 ${templateStyles.textColor}`}
      >
        {/* Header with logo/avatar */}
        <div className="flex items-center gap-3">
          {currentProfile.image ? (
            <img
              src={currentProfile.image}
              alt="avatar"
              className={`w-12 h-12 ${
                isPersonal ? "rounded-full" : "rounded-lg"
              } border-2 ${
                isGlassTemplate
                  ? "border-gray-300"
                  : isNeonTemplate
                  ? `border-white shadow-[0_0_15px_${templateStyles.glow}]`
                  : "border-white/80"
              } object-cover shadow-lg`}
            />
          ) : (
            <div
              className={`w-12 h-12 flex items-center justify-center text-xl ${
                isGlassTemplate
                  ? "bg-gray-100 border-gray-300 text-gray-600"
                  : isNeonTemplate
                  ? `bg-white/10 border-white text-white shadow-[0_0_15px_${templateStyles.glow}]`
                  : "bg-white/20 border-white/40 text-white"
              } border-2 ${
                isPersonal ? "rounded-full" : "rounded-lg"
              } shadow-lg backdrop-blur-sm`}
            >
              {isPersonal ? "👤" : "🏢"}
            </div>
          )}

          <div>
            <p
              className={`text-sm font-semibold ${
                isGlassTemplate
                  ? "text-gray-700"
                  : isNeonTemplate || isDarkTemplate
                  ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  : "opacity-90"
              }`}
            >
              Dot LinkMe
            </p>
            <p
              className={`text-xs ${
                isGlassTemplate
                  ? "text-gray-500"
                  : isNeonTemplate || isDarkTemplate
                  ? "text-gray-300"
                  : "opacity-70"
              }`}
            >
              Smart NFC Digital Identity
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-0.5">
          <h3
            className={`text-lg font-bold tracking-tight ${
              isGlassTemplate
                ? "text-gray-900"
                : isNeonTemplate
                ? `drop-shadow-[0_0_10px_${templateStyles.glow}]`
                : isDarkTemplate
                ? "drop-shadow-lg"
                : ""
            }`}
          >
            {currentProfile.name || (isPersonal ? "Your Name" : "Company Name")}
          </h3>
          <p
            className={`text-xs ${
              isGlassTemplate
                ? "text-gray-600"
                : isNeonTemplate || isDarkTemplate
                ? "text-gray-200"
                : "opacity-85"
            }`}
          >
            {currentProfile.title ||
              (isPersonal ? "Your role or title" : "Your industry")}
          </p>
          <p
            className={`text-[11px] mt-1 line-clamp-2 ${
              isGlassTemplate
                ? "text-gray-500"
                : isNeonTemplate || isDarkTemplate
                ? "text-gray-300"
                : "opacity-75"
            }`}
          >
            {currentProfile.bio ||
              "This is a preview of your smart identity card. Add a short bio or description here."}
          </p>
        </div>

        {/* Footer with tags and QR */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-[10px]">
            <span
              className={`px-2 py-1 rounded-full ${
                isGlassTemplate
                  ? "bg-gray-200 text-gray-700"
                  : isNeonTemplate
                  ? `bg-white/10 text-white border border-white/30 backdrop-blur-sm shadow-[0_0_10px_${templateStyles.glow}]`
                  : isDarkTemplate
                  ? "bg-white/10 text-white backdrop-blur-sm"
                  : "bg-black/15 text-white opacity-80"
              }`}
            >
              {isPersonal ? "Personal" : "Business"}
            </span>
            <span
              className={`px-2 py-1 rounded-full ${
                isGlassTemplate
                  ? "bg-gray-200 text-gray-700"
                  : isNeonTemplate
                  ? `bg-white/10 text-white border border-white/30 backdrop-blur-sm shadow-[0_0_10px_${templateStyles.glow}]`
                  : isDarkTemplate
                  ? "bg-white/10 text-white backdrop-blur-sm"
                  : "bg-black/15 text-white opacity-80"
              }`}
            >
              NFC • QR
            </span>
          </div>

          <div
            className={`bg-white rounded-md p-1 shadow-lg ${
              isNeonTemplate ? `shadow-[0_0_20px_${templateStyles.glow}]` : ""
            }`}
          >
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
  useEffect(() => {
    if (currentProfile?.image) {
    } else {
      console.log("🖼️ LiveCardPreview - no image yet");
    }
  }, [currentProfile?.image]);
  const profileUrl = generateProfileUrl(currentProfile.name);
  const [copied, setCopied] = React.useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="space-y-6 lg:sticky lg:top-28 lg:flex-[1] min-w-0"
      data-aos="fade-left"
    >
      <div className="card-glass p-5 md:p-6 border-2 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide flex items-center gap-1">
              <span>⚡</span> Live Preview
            </p>
            <p className="text-sm text-gray-500">Real-time card preview</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-brand-primary/10 to-purple-500/10 text-[11px] font-medium text-brand-primary border border-brand-primary/20">
            {profileType === "personal" ? "👤 Personal" : "💼 Business"}
          </span>
        </div>

        {/* Template info badge */}
        <div className="mb-4 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-sm">
            <span className="text-xs font-medium text-gray-700">
              Template:{" "}
              <span className="font-bold">
                {selectedTemplate.charAt(0).toUpperCase() +
                  selectedTemplate.slice(1)}
              </span>
            </span>
            {currentProfile.designMode === "ai" &&
              currentProfile.aiBackground && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-semibold">
                  ✨ AI
                </span>
              )}
            {currentProfile.designMode === "manual" && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                🎨 Manual
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <CardPreview
            profileType={profileType}
            currentProfile={currentProfile}
            selectedTemplate={selectedTemplate}
            profileUrl={profileUrl}
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border border-gray-200">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-600 flex items-center gap-1">
              <span>🔗</span> Your smart link
            </p>
            <p className="text-xs text-gray-800 truncate font-mono">
              {profileUrl}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopyUrl}
            className={`btn-ghost-clean text-xs px-3 py-2 whitespace-nowrap transition-all font-semibold ${
              copied
                ? "bg-green-100 text-green-700 border-green-300 scale-105"
                : "hover:scale-105"
            }`}
          >
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
        </div>

        {/* Design customization preview info */}
        {currentProfile.designMode === "manual" && currentProfile.color && (
          <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <div className="flex items-center gap-2 text-xs">
              <div
                className="w-5 h-5 rounded-lg border-2 border-white shadow-md"
                style={{ backgroundColor: currentProfile.color }}
              />
              <span className="text-gray-700">
                Brand color:{" "}
                <span className="font-mono font-bold">
                  {currentProfile.color.toUpperCase()}
                </span>
              </span>
            </div>
          </div>
        )}

        {currentProfile.designMode === "ai" && currentProfile.aiBackground && (
          <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-purple-900">
                  AI-Generated Background
                </p>
                {currentProfile.aiPrompt && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    "{currentProfile.aiPrompt}"
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card-glass p-4 text-xs text-gray-600 space-y-2 border-2 border-gray-100">
        <p className="font-semibold text-brand-dark flex items-center gap-1">
          <span>💡</span> Pro Tips
        </p>
        <ul className="space-y-1 pl-1">
          <li className="flex items-start gap-1">
            <span>•</span>
            <span>Changes update in real-time on the preview</span>
          </li>
          <li className="flex items-start gap-1">
            <span>•</span>
            <span>Try different templates to find your perfect style</span>
          </li>
          <li className="flex items-start gap-1">
            <span>•</span>
            <span>Use AI design for unique, custom backgrounds</span>
          </li>
          <li className="flex items-start gap-1">
            <span>•</span>
            <span>
              Create both profiles to separate personal & professional
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
