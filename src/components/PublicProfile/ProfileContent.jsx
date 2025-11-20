import React from "react";

export default function ProfileContent({
  profile,
  handleSocialClick,
  getPlatformIcon,
  setShowQRModal,
  isFlipped,
  setIsFlipped,
}) {
  return (
    <div className="p-8 pt-24 h-full flex flex-col relative">
      {/* BIO */}
      {profile.bio && (
        <div className="mb-6">
          <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            About
          </h3>

          <p className="text-gray-300 text-sm leading-relaxed">{profile.bio}</p>
        </div>
      )}

      {/* SOCIAL LINKS */}
      {profile.socialLinks &&
        profile.socialLinks.filter(
          (l) =>
            l.platform !== "phone" &&
            l.platform !== "email" &&
            l.platform !== "whatsapp"
        ).length > 0 && (
          <div className="flex-1 overflow-y-auto mb-6">
            <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              Connect
            </h3>

            <div className="space-y-2">
              {profile.socialLinks
                .filter(
                  (l) =>
                    l.platform !== "phone" &&
                    l.platform !== "email" &&
                    l.platform !== "whatsapp"
                )
                .map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleSocialClick(link.id, link.url)}
                    className="w-full flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center">
                      {getPlatformIcon(link.platform)}
                    </div>

                    <div className="flex-1 text-left">
                      <p className="text-white font-medium capitalize text-sm">
                        {link.label || link.platform}
                      </p>
                    </div>

                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ))}
            </div>
          </div>
        )}

      {/* QR Code Button */}
      <button
        onClick={() => setShowQRModal(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg"
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
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          />
        </svg>
        View QR Code
      </button>

      {/* Flip Back */}
      <button
        onClick={() => setIsFlipped(false)}
        className="w-full mt-3 py-2 text-gray-400 hover:text-white text-sm flex justify-center gap-2 transition"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Flip back
      </button>
    </div>
  );
}
