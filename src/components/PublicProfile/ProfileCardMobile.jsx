import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Mail,
  Phone,
  MessageCircle,
  Download,
  Share2,
  QrCode,
  Globe,
  User,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { getPlatformIcon } from "../../utils/platformIcons";

export default function ProfileCardMobile({
  profile,
  phoneLink,
  emailLink,
  whatsappLink,
  handleCall,
  handleEmail,
  handleWhatsApp,
  handleDownloadVCard,
  handleSocialClick,
  setShowShareModal,
  setShowQRModal,
}) {
  const [showQR, setShowQR] = useState(false);
  const isPersonal = profile.profileType === "personal";
  const visibleLinks =
    profile.socialLinks?.filter(
      (link) =>
        link.isVisible &&
        link.platform !== "phone" &&
        link.platform !== "email" &&
        link.platform !== "whatsapp"
    ) || [];

  console.log("Avatar URL:", profile.avatarUrl);

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-lg mx-auto">
        {/* Main Card */}
        <div className="bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-black/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden">
          {/* Profile Header */}
          <div className="relative p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-6">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className={`w-32 h-32 object-cover ring-4 ring-white/20 shadow-2xl ${
                      isPersonal ? "rounded-full" : "rounded-3xl"
                    }`}
                  />
                ) : (
                  <div
                    className={`w-32 h-32 bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center text-5xl ring-4 ring-white/20 shadow-2xl ${
                      isPersonal ? "rounded-full" : "rounded-3xl"
                    }`}
                  >
                    {isPersonal ? (
                      <User className="w-16 h-16 text-white/80" />
                    ) : (
                      <Building2 className="w-16 h-16 text-white/80" />
                    )}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Name & Title */}
              <h1 className="text-3xl font-bold text-white mb-2">
                {profile.name}
              </h1>
              {profile.title && (
                <p className="text-lg text-blue-300 font-medium mb-4">
                  {profile.title}
                </p>
              )}
              {profile.bio && (
                <p className="text-gray-300 text-sm leading-relaxed px-4">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {phoneLink && (
                <button
                  onClick={() => handleCall(phoneLink.url)}
                  className="flex flex-col items-center gap-2 px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-blue-400/50 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-blue-300" />
                  </div>
                  <span className="text-white font-medium text-sm">Call</span>
                </button>
              )}

              {emailLink && (
                <button
                  onClick={() => handleEmail(emailLink.url)}
                  className="flex flex-col items-center gap-2 px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-purple-400/50 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-purple-300" />
                  </div>
                  <span className="text-white font-medium text-sm">Email</span>
                </button>
              )}

              {whatsappLink && (
                <button
                  onClick={() => handleWhatsApp(whatsappLink.url)}
                  className="flex flex-col items-center gap-2 px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-green-400/50 transition-all group col-span-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-green-300" />
                  </div>
                  <span className="text-white font-medium text-sm">
                    WhatsApp
                  </span>
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="flex flex-col items-center gap-2 px-3 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <Share2 className="w-5 h-5 text-blue-300" />
                <span className="text-white text-xs font-medium">Share</span>
              </button>
              {/* <button
                onClick={() => setShowQRModal(true)}
                className="flex flex-col items-center gap-2 px-3 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <QrCode className="w-5 h-5 text-purple-300" />
                <span className="text-white text-xs font-medium">QR Code</span>
              </button> */}
              <button
                onClick={handleDownloadVCard}
                className="flex flex-col items-center gap-2 px-3 py-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-blue-400/30 hover:border-blue-400/50 transition-all"
              >
                <Download className="w-5 h-5 text-blue-300" />
                <span className="text-white text-xs font-medium">Save</span>
              </button>
            </div>
          </div>

          {/* QR Code Collapsible */}
          {/* <div className="px-6 pb-6">
            <button
              onClick={() => setShowQR(!showQR)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <span className="text-white font-medium">Quick QR Code</span>
              {showQR ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {showQR && (
              <div className="mt-4 bg-white p-4 rounded-xl">
                <QRCodeCanvas
                  value={profile.profileUrl}
                  size={200}
                  level="H"
                  includeMargin
                  className="mx-auto"
                />
                <p className="text-center text-xs text-gray-600 mt-2 font-medium">
                  Scan to save contact
                </p>
              </div>
            )}
          </div> */}

          {/* Social Links */}
          {visibleLinks.length > 0 && (
            <div className="p-6 pt-0">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Connect With Me
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {visibleLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleSocialClick(link.id, link.url)}
                    className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/30 hover:from-white/20 hover:to-white/10 transition-all"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getPlatformIcon(link.platform)}
                      </div>
                      <span className="text-white font-medium capitalize text-xs">
                        {link.platform}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Powered By */}
          <div className="p-6 pt-4 border-t border-white/10">
            <div className="flex flex-col items-center gap-1 text-gray-500 text-xs">
              <span>Powered by</span>
              <a
                href="/"
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
              >
                Dot LinkMe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
