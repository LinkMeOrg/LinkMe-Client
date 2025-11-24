import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

// AI Generation utility
const generateAIImage = async (prompt) => {
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=450&nologo=true&enhance=true`;
  return imageUrl;
};

// Utility functions for card styling
function getTemplateStyles(selectedTemplate, currentProfile) {
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

  if (currentProfile.designMode === "upload" && currentProfile.uploadedImage) {
    return {
      style: {
        backgroundImage: `url(${currentProfile.uploadedImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      className: "",
      textColor: "text-white",
      overlay: "from-black/40 to-black/20",
    };
  }

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
            boxShadow: `0 0 30px ${color}40`,
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
      default:
        return {
          style: { backgroundColor: color },
          className: "",
          textColor: "text-white",
          overlay: "from-black/5 to-transparent",
        };
    }
  }

  return {
    style: {},
    className:
      "bg-gradient-to-br from-brand-primary/90 via-[#0B0F19] to-[#16203A]",
    textColor: "text-white",
    overlay: "from-black/10 to-transparent",
  };
}

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

// Card Preview Component
function CardPreviewCheckout({ profile, currentDesign }) {
  const isPersonal = profile.profileType === "personal";
  const templateStyles = getTemplateStyles(currentDesign.template, {
    ...profile,
    color: currentDesign.color,
    designMode: currentDesign.designMode,
    aiBackground: currentDesign.aiBackground,
    uploadedImage: currentDesign.uploadedImage,
  });

  return (
    <div
      className={`relative w-full h-44 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${templateStyles.className}`}
      style={{
        ...templateStyles.style,
        ...(templateStyles.borderColor && {
          borderColor: templateStyles.borderColor,
        }),
      }}
    >
      {templateStyles.overlay && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${templateStyles.overlay}`}
        />
      )}

      <div
        className={`relative z-10 h-full flex flex-col justify-between px-4 py-3 ${templateStyles.textColor}`}
      >
        <div>
          <p className="text-xs font-semibold opacity-90">Dot LinkMe</p>
          <p className="text-[10px] opacity-70">Smart NFC Digital Identity</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[9px]"></div>
          <div className="bg-white rounded-md p-1 shadow-lg">
            <QRCodeCanvas value={profile.profileUrl} size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}

// AI Design Panel Component
function AIDesignPanel({ aiPrompt, onPromptChange, onGenerate, isGenerating }) {
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) {
      setError("Please enter a description for your card design");
      return;
    }
    setError(null);
    onGenerate();
  };

  const suggestedPrompts = [
    "Soft blue gradient with subtle glow and modern abstract shapes",
    "Elegant dark theme with gold accents and luxury feel",
    "Minimal white with pastel pink and blue touches",
  ];

  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200/50 p-4 space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-xl">✨</span>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">AI Design Generator</p>
          <p className="text-xs text-gray-600">
            Describe your ideal card design
          </p>
        </div>
      </div>

      <textarea
        value={aiPrompt}
        onChange={(e) => {
          onPromptChange(e.target.value);
          setError(null);
        }}
        placeholder="e.g. Modern gradient with neon glow effects and geometric patterns"
        rows={3}
        className="w-full border-2 border-purple-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 bg-white resize-none"
        disabled={isGenerating}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2">
          <p className="text-xs text-red-600">⚠️ {error}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating || !aiPrompt.trim()}
        className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
          isGenerating || !aiPrompt.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700"
        } text-white`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </span>
        ) : (
          "🎨 Generate AI Design"
        )}
      </button>

      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-700">💡 Try these:</p>
        <div className="grid grid-cols-1 gap-2">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onPromptChange(prompt)}
              disabled={isGenerating}
              className="text-xs px-3 py-2 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CartCheckout() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const [allProfiles, setAllProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [profile, setProfile] = useState(null);

  const [showDesignEdit, setShowDesignEdit] = useState(false);
  const [showTemplateGuide, setShowTemplateGuide] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const [currentDesign, setCurrentDesign] = useState({
    color: "",
    template: "",
    designMode: "manual",
    aiBackground: null,
    uploadedImage: null,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Jordan",
    notes: "",
  });

  const templates = [
    { id: "modern", name: "Modern", icon: "🎯" },
    { id: "gradient", name: "Gradient", icon: "🌈" },
    { id: "glass", name: "Glass", icon: "💎" },
    { id: "dark", name: "Dark", icon: "🌙" },
    { id: "neon", name: "Neon", icon: "⚡" },
    { id: "elegant", name: "Elegant", icon: "✨" },
  ];

  const presetColors = [
    { name: "Blue", value: "#2563eb" },
    { name: "Purple", value: "#9333ea" },
    { name: "Pink", value: "#ec4899" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Green", value: "#10b981" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Indigo", value: "#6366f1" },
  ];

  useEffect(() => {
    fetchProfiles();
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (selectedProfileId && allProfiles.length > 0) {
      const selected = allProfiles.find((p) => p.id === selectedProfileId);
      if (selected) {
        setProfile(selected);
        setCurrentDesign({
          color: selected.color,
          template: selected.template,
          designMode: selected.designMode,
          aiBackground: selected.aiBackground,
          uploadedImage: null,
        });
      }
    }
  }, [selectedProfileId, allProfiles]);

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/profiles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        setAllProfiles(data.data);
        setSelectedProfileId(data.data[0].id);
      } else {
        navigate("/create-card");
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phoneNumber || "",
      }));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const imageUrl = await generateAIImage(aiPrompt);

      // Preload image
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(imageUrl);
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageUrl;
      });

      setCurrentDesign({
        ...currentDesign,
        designMode: "ai",
        aiBackground: imageUrl,
        uploadedImage: null,
      });
    } catch (error) {
      alert("Failed to generate AI design. Please try again.");
      console.error(error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentDesign({
          ...currentDesign,
          designMode: "upload",
          uploadedImage: event.target.result,
          aiBackground: null,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileId: profile.id,
          customerInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          shippingInfo: {
            address: formData.address,
            city: formData.city,
            country: formData.country,
            notes: formData.notes,
          },
          cardDesign: {
            ...currentDesign,
            // Convert uploaded image to base64 if exists
            uploadedImage: currentDesign.uploadedImage || null,
          },
          paymentMethod: "cash_on_delivery",
          totalAmount: 15.0,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order placed successfully! We'll contact you soon.");
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Please create a profile first before ordering a card.
          </p>
          <button
            onClick={() => navigate("/create-card")}
            className="btn-primary"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <h1 className="text-3xl font-bold text-brand-dark mb-2">
          Order Your NFC Card
        </h1>
        <p className="text-gray-600 mb-8">
          Review your card design and complete your order
        </p>

        {/* Profile Selector */}
        {allProfiles.length > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Select Profile to Order
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allProfiles.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => setSelectedProfileId(prof.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedProfileId === prof.id
                      ? "border-brand-primary bg-brand-primary/5 shadow-md"
                      : "border-gray-200 hover:border-brand-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {prof.avatarUrl ? (
                      <img
                        src={prof.avatarUrl}
                        alt={prof.name}
                        className={`w-12 h-12 ${
                          prof.profileType === "personal"
                            ? "rounded-full"
                            : "rounded-lg"
                        } object-cover border-2 border-gray-200`}
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 ${
                          prof.profileType === "personal"
                            ? "rounded-full"
                            : "rounded-lg"
                        } bg-gray-100 flex items-center justify-center text-2xl border-2 border-gray-200`}
                      >
                        {prof.profileType === "personal" ? "👤" : "🏢"}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{prof.name}</p>
                      <p className="text-sm text-gray-600">{prof.title}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {prof.profileType === "personal"
                          ? "👤 Personal"
                          : "💼 Business"}
                      </span>
                    </div>
                    {selectedProfileId === prof.id && (
                      <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Card Preview & Design Options */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Your Card Preview
              </h2>
              <CardPreviewCheckout
                profile={profile}
                currentDesign={currentDesign}
              />

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowDesignEdit(!showDesignEdit)}
                  className="flex-1 btn-ghost-clean text-sm py-2"
                >
                  {showDesignEdit ? "✓ Done" : "🎨 Edit Design"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTemplateGuide(!showTemplateGuide)}
                  className="flex-1 btn-ghost-clean text-sm py-2"
                >
                  {showTemplateGuide ? "✓ Close" : "📐 Template Guide"}
                </button>
              </div>
            </div>

            {/* Template Guide Modal */}
            {showTemplateGuide && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Card Template Guide
                </h3>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Standard NFC Card Dimensions:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Size: 85.6mm × 54mm (Credit card size)</li>
                      <li>• Aspect Ratio: 16:10</li>
                      <li>• Recommended Image: 800×450px minimum</li>
                      <li>
                        • Safe Zone: Keep important content 5mm from edges
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-900">
                      <span className="font-semibold">💡 Tip:</span> Your
                      logo/photo will be placed in the top-left corner. Leave
                      space for it when designing your background!
                    </p>
                  </div>
                  <img
                    src="/card-template-guide.png"
                    alt="Card template"
                    className="w-full rounded-lg border"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <div
                    style={{ display: "none" }}
                    className="bg-gray-100 rounded-lg p-8 text-center"
                  >
                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        Card Template Visualization
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        85.6mm × 54mm
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showDesignEdit && (
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Customize Design
                </h3>

                {/* Design Mode Selector */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Design Mode
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentDesign({
                          ...currentDesign,
                          designMode: "manual",
                          aiBackground: null,
                          uploadedImage: null,
                        })
                      }
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        currentDesign.designMode === "manual"
                          ? "border-brand-primary bg-brand-primary/5"
                          : "border-gray-200 hover:border-brand-primary/50"
                      }`}
                    >
                      <div className="text-2xl mb-1">🎨</div>
                      <div className="text-[10px] font-medium">Manual</div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentDesign({ ...currentDesign, designMode: "ai" })
                      }
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        currentDesign.designMode === "ai"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-400"
                      }`}
                    >
                      <div className="text-2xl mb-1">✨</div>
                      <div className="text-[10px] font-medium">AI</div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("image-upload").click()
                      }
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        currentDesign.designMode === "upload"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-400"
                      }`}
                    >
                      <div className="text-2xl mb-1">📤</div>
                      <div className="text-[10px] font-medium">Upload</div>
                    </button>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* AI Design Panel */}
                {currentDesign.designMode === "ai" && (
                  <AIDesignPanel
                    aiPrompt={aiPrompt}
                    onPromptChange={setAiPrompt}
                    onGenerate={handleGenerateAI}
                    isGenerating={isGeneratingAI}
                  />
                )}

                {/* Manual Design Options */}
                {currentDesign.designMode === "manual" && (
                  <>
                    {/* Template Selector */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Template
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {templates.map((template) => (
                          <button
                            key={template.id}
                            type="button"
                            onClick={() =>
                              setCurrentDesign({
                                ...currentDesign,
                                template: template.id,
                              })
                            }
                            className={`p-3 rounded-lg border-2 text-center transition-all ${
                              currentDesign.template === template.id
                                ? "border-brand-primary bg-brand-primary/5"
                                : "border-gray-200 hover:border-brand-primary/50"
                            }`}
                          >
                            <div className="text-2xl mb-1">{template.icon}</div>
                            <div className="text-[10px] font-medium">
                              {template.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Selector */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Color
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {presetColors.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            onClick={() =>
                              setCurrentDesign({
                                ...currentDesign,
                                color: color.value,
                              })
                            }
                            className={`h-10 rounded-lg border-2 transition-all ${
                              currentDesign.color === color.value
                                ? "border-brand-dark ring-2 ring-brand-primary/30 scale-110"
                                : "border-gray-200"
                            }`}
                            style={{
                              background: `linear-gradient(135deg, ${
                                color.value
                              }, ${adjustColorBrightness(color.value, -20)})`,
                            }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Upload Info */}
                {currentDesign.designMode === "upload" &&
                  currentDesign.uploadedImage && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-green-900">
                        ✓ Custom Image Uploaded
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Your custom design is ready!
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("image-upload").click()
                        }
                        className="mt-2 text-xs text-green-700 underline"
                      >
                        Upload Different Image
                      </button>
                    </div>
                  )}
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">NFC Card</span>
                  <span className="font-medium">15.00 JOD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-brand-primary text-lg">
                    15.00 JOD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="123 Main Street, Building 5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Amman"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Any special instructions for delivery..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Method
                </h2>
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💵</span>
                    </div>
                    <div className="space-y-3">
                      {/* Option 1 */}
                      <div>
                        <p className="font-semibold text-green-900">
                          Cash on Delivery
                        </p>
                        <p className="text-sm text-green-700">
                          Pay when you receive your card
                        </p>
                      </div>

                      {/* Option 2 - CLICK Payment */}
                      <div>
                        <p className="font-semibold text-blue-900">
                          Click Payment
                        </p>
                        <p className="text-sm text-blue-700">
                          Send the payment instantly via Click using the name
                          “HALAISSAWI”
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing Order...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                By placing this order, you agree to our terms and conditions
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
