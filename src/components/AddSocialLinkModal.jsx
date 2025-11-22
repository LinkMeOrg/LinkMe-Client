import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";

const PLATFORM_ENUM = [
  { value: "website", label: "Website" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "github", label: "GitHub" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

export default function AddSocialLinkModal({
  isOpen,
  onClose,
  onAdd,
  existingPlatforms = [],
}) {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [whatsAppType, setWhatsAppType] = useState("number"); // number or link

  const countryCodes = [
    { name: "Jordan", code: "+962", shortcut: "JO", flag: "🇯🇴" },
    { name: "Saudi Arabia", code: "+966", shortcut: "SA", flag: "🇸🇦" },
    { name: "UAE", code: "+971", shortcut: "AE", flag: "🇦🇪" },
    { name: "Qatar", code: "+974", shortcut: "QA", flag: "🇶🇦" },
    { name: "Kuwait", code: "+965", shortcut: "KW", flag: "🇰🇼" },
    { name: "USA", code: "+1", shortcut: "US", flag: "🇺🇸" },
    { name: "UK", code: "+44", shortcut: "GB", flag: "🇬🇧" },
    { name: "Australia", code: "+61", shortcut: "AU", flag: "🇦🇺" },
    { name: "Germany", code: "+49", shortcut: "DE", flag: "🇩🇪" },
    { name: "France", code: "+33", shortcut: "FR", flag: "🇫🇷" },
    { name: "Italy", code: "+39", shortcut: "IT", flag: "🇮🇹" },
    { name: "Spain", code: "+34", shortcut: "ES", flag: "🇪🇸" },
  ];

  const availablePlatforms = PLATFORM_ENUM.filter(
    (p) => !existingPlatforms.includes(p.value)
  );

  useEffect(() => {
    if (isOpen) {
      setPlatform("");
      setUrl("");
      setCountryCode("+1");
      setWhatsAppType("number");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let trimmedUrl = url.trim();

    // Email validation
    if (platform === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedUrl)) {
        Swal.fire({
          title: "Invalid Email",
          text: "Please enter a valid email address.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
    }

    // WhatsApp validation
    if (platform === "whatsapp") {
      if (whatsAppType === "number") {
        const phoneRegex = /^\+?\d{7,15}$/;
        if (!phoneRegex.test(trimmedUrl.replace(/\D/g, ""))) {
          Swal.fire({
            title: "Invalid WhatsApp Number",
            text: "Please enter a valid phone number.",
            icon: "warning",
            confirmButtonText: "OK",
          });
          return;
        }
        trimmedUrl = `https://wa.me/${trimmedUrl.replace(/\D/g, "")}`;
      } else {
        const whatsappUrlRegex =
          /^https?:\/\/(wa\.me|api\.whatsapp\.com)\/\d+$/i;
        if (!whatsappUrlRegex.test(trimmedUrl)) {
          Swal.fire({
            title: "Invalid WhatsApp Link",
            text: "Please enter a valid WhatsApp link.",
            icon: "warning",
            confirmButtonText: "OK",
          });
          return;
        }
      }
    }

    // Other URL validation
    if (
      ["website", "linkedin", "instagram", "twitter", "github"].includes(
        platform
      )
    ) {
      if (!/^https?:\/\//i.test(trimmedUrl)) {
        Swal.fire({
          title: "Invalid URL",
          text: "URL must start with http:// or https://",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
    }

    // Phone number
    if (platform === "phone") {
      trimmedUrl = `${countryCode}${trimmedUrl.replace(/\D/g, "")}`;
    }

    onAdd(platform, trimmedUrl);
    setPlatform("");
    setUrl("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Social Link</h2>

        {availablePlatforms.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">All platforms have been added!</p>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-300"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Platform Select */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                required
              >
                <option value="">Select Platform</option>
                {availablePlatforms.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* WhatsApp type selection */}
            {platform === "whatsapp" && (
              <div className="flex gap-4 items-center mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="whatsappType"
                    value="number"
                    checked={whatsAppType === "number"}
                    onChange={() => setWhatsAppType("number")}
                    className="form-radio"
                  />
                  Number
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="whatsappType"
                    value="link"
                    checked={whatsAppType === "link"}
                    onChange={() => setWhatsAppType("link")}
                    className="form-radio"
                  />
                  Link
                </label>
              </div>
            )}

            {/* Input fields */}
            {platform === "whatsapp" ? (
              whatsAppType === "number" ? (
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.shortcut} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                    placeholder="Enter WhatsApp number"
                    required
                  />
                </div>
              ) : (
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                  placeholder="Enter full WhatsApp link"
                  required
                />
              )
            ) : platform === "phone" ? (
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.shortcut} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold mb-2">
                  URL / Contact
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                  placeholder="Enter URL or contact info"
                  required
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-brand-primary text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
