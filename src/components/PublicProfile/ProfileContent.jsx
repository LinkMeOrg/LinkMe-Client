import React from "react";
import { Info, Link2, ExternalLink, QrCode, RefreshCw } from "lucide-react";

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
            <Info className="w-5 h-5 text-blue-400" />
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
              <Link2 className="w-5 h-5 text-purple-400" />
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

                    <ExternalLink className="w-5 h-5 text-gray-400" />
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
        <QrCode className="w-5 h-5" />
        View QR Code
      </button>

      {/* Flip Back */}
      <button
        onClick={() => setIsFlipped(false)}
        className="w-full mt-3 py-2 text-gray-400 hover:text-white text-sm flex justify-center gap-2 transition"
      >
        <RefreshCw className="w-4 h-4" />
        Flip back
      </button>
    </div>
  );
}
