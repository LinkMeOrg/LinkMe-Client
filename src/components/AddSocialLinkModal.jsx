import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";

// Match the exact ENUM from your Sequelize model
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

  // Filter out platforms that already exist
  const availablePlatforms = PLATFORM_ENUM.filter(
    (p) => !existingPlatforms.includes(p.value)
  );

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setPlatform("");
      setUrl("");
      setCountryCode("+1");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate URL for web platforms
    if (
      ["website", "linkedin", "instagram", "twitter", "github"].includes(
        platform
      )
    ) {
      if (!/^https?:\/\//i.test(url)) {
        Swal.fire({
          title: "Invalid URL",
          text: "URL must start with http:// or https://",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
    }

    // Prepend country code for phone/whatsapp
    let finalUrl = url;
    if (["phone", "whatsapp"].includes(platform)) {
      finalUrl = `${countryCode}${url.replace(/\D/g, "")}`; // keep only digits
    }

    onAdd(platform, finalUrl);
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

            {["phone", "whatsapp"].includes(platform) ? (
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.shortcut} {c.code}
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
                <Plus className="w-4 h-4" />
                Add Link
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
