import React, { useState } from "react";
import { SOCIAL_PLATFORMS, countryCodes } from "./constants";

export default function SocialLinksSection({
  socialLinks,
  onSocialLinksChange,
}) {
  const [errors, setErrors] = useState({});

  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{10,15}$/; // allows + and 10-15 digits

  return (
    <div className="pt-4 border-t-2 border-gray-100 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-brand-dark flex items-center gap-2">
          <span>🔗</span> Social Links & Contact
        </h3>
        <span className="text-[11px] text-gray-500">
          Optional but recommended
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SOCIAL_PLATFORMS.map((platform) => {
          const shouldValidateUrl =
            platform.key !== "email" &&
            platform.key !== "phone" &&
            platform.key !== "whatsapp";

          // Phone and WhatsApp inputs
          if (platform.key === "phone" || platform.key === "whatsapp") {
            return (
              <div key={platform.key} className="space-y-1">
                <label className="text-[11px] font-medium text-gray-600 capitalize flex items-center gap-1">
                  <span>{platform.icon}</span> {platform.label}
                </label>
                <div className="flex gap-2">
                  {platform.key === "phone" && (
                    <select
                      value={socialLinks[`${platform.key}_code`] || "+962"}
                      onChange={(e) =>
                        onSocialLinksChange(
                          `${platform.key}_code`,
                          e.target.value
                        )
                      }
                      className="border border-gray-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                  )}
                  <input
                    type="text"
                    value={socialLinks[platform.key] || ""}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      let isValid = false;

                      if (platform.key === "whatsapp") {
                        // WhatsApp: accept either phone number or URL
                        if (value.startsWith("http")) {
                          isValid = urlRegex.test(value);
                        } else {
                          isValid = phoneRegex.test(value);
                        }
                      } else {
                        // Phone: only number validation
                        isValid = phoneRegex.test(value);
                      }

                      onSocialLinksChange(platform.key, value);

                      setErrors((prev) => ({
                        ...prev,
                        [platform.key]: !isValid,
                      }));
                    }}
                    placeholder={platform.placeholder}
                    className={`w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 transition-all
                      ${
                        errors[platform.key]
                          ? "border-2 border-red-500 focus:ring-red-400"
                          : "border border-gray-200 focus:ring-brand-primary/40"
                      }`}
                  />
                </div>
                {errors[platform.key] && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1">
                    <span>⚠️</span>{" "}
                    {platform.key === "whatsapp"
                      ? "Enter a valid WhatsApp number (10-15 digits) or URL"
                      : "Enter a valid number (10-15 digits)"}
                  </p>
                )}
              </div>
            );
          }

          // Email input
          if (platform.key === "email") {
            return (
              <div key={platform.key} className="space-y-1">
                <label className="text-[11px] font-medium text-gray-600 capitalize flex items-center gap-1">
                  <span>{platform.icon}</span> {platform.label}
                </label>
                <input
                  type="text"
                  value={socialLinks[platform.key] || ""}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    const isValid = emailRegex.test(value);

                    onSocialLinksChange(platform.key, value);

                    setErrors((prev) => ({
                      ...prev,
                      [platform.key]: !isValid,
                    }));
                  }}
                  placeholder={platform.placeholder}
                  className={`w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 transition-all
                    ${
                      errors[platform.key]
                        ? "border-2 border-red-500 focus:ring-red-400"
                        : "border border-gray-200 focus:ring-brand-primary/40"
                    }`}
                />
                {errors[platform.key] && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1">
                    <span>⚠️</span> Please enter a valid email
                  </p>
                )}
              </div>
            );
          }

          // Other social platforms (URL)
          return (
            <div key={platform.key} className="space-y-1">
              <label className="text-[11px] font-medium text-gray-600 capitalize flex items-center gap-1">
                <span>{platform.icon}</span> {platform.label}
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
                className={`w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 transition-all
                  ${
                    errors[platform.key]
                      ? "border-2 border-red-500 focus:ring-red-400"
                      : "border border-gray-200 focus:ring-brand-primary/40"
                  }`}
              />
              {errors[platform.key] && (
                <p className="text-[11px] text-red-500 flex items-center gap-1">
                  <span>⚠️</span> Please enter a valid URL (http or https)
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
