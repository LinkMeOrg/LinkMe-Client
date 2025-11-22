// ==================== UTILITY FUNCTIONS ====================

export function generateProfileUrl(name) {
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

export function getTemplateStyles(template, profile) {
  // If AI mode and has AI background, use it
  if (profile?.designMode === "ai" && profile?.aiBackground) {
    return {
      style: {
        backgroundImage: `url(${profile.aiBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      className: "",
      textColor: "text-white",
      overlay: "from-black/40 to-black/20",
    };
  }

  // Manual mode - use the selected color
  if (profile?.designMode === "manual" && profile?.color) {
    const color = profile.color;

    switch (template) {
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
export function adjustColorBrightness(color, percent) {
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

export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString();
}
