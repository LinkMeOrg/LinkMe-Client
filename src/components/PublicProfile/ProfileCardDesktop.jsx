import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Mail,
  Phone,
  MessageCircle,
  Download,
  Share2,
  QrCode,
  MapPin,
  Globe,
  Briefcase,
  User,
  Building2,
} from "lucide-react";
import { getPlatformIcon } from "../../utils/platformIcons";
import ShareModal from "../PublicProfile/Modals";

export default function ProfileCardDesktop({
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
  const isPersonal = profile.profileType === "personal";
  const visibleLinks =
    profile.socialLinks?.filter(
      (link) =>
        link.isVisible &&
        link.platform !== "phone" &&
        link.platform !== "email" &&
        link.platform !== "whatsapp"
    ) || [];

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* NFC Card Layout - Horizontal */}
        <div className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-black/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-5 gap-0">
            {/* Left Side - Profile Info & QR (40%) */}
            <div className="col-span-2 p-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-r border-white/10">
              {/* Profile Header */}
              <div className="text-center mb-8">
                {/* Avatar */}
                <div className="relative inline-block mb-6">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className={`w-40 h-40 object-cover ring-4 ring-white/20 shadow-2xl ${
                        isPersonal ? "rounded-full" : "rounded-3xl"
                      }`}
                    />
                  ) : (
                    <div
                      className={`w-40 h-40 bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center text-6xl ring-4 ring-white/20 shadow-2xl ${
                        isPersonal ? "rounded-full" : "rounded-3xl"
                      }`}
                    >
                      {isPersonal ? (
                        <User className="w-20 h-20 text-white/80" />
                      ) : (
                        <Building2 className="w-20 h-20 text-white/80" />
                      )}
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Name & Title */}
                <h1 className="text-4xl font-bold text-white mb-2">
                  {profile.name}
                </h1>
                {profile.title && (
                  <p className="text-xl text-blue-300 font-medium mb-4">
                    {profile.title}
                  </p>
                )}
                {profile.bio && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {profile.bio}
                  </p>
                )}
              </div>

              {/* Quick Contact Actions */}
              <div className="space-y-3 mb-8">
                {phoneLink && (
                  <button
                    onClick={() => handleCall(phoneLink.url)}
                    className="w-full flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 hover:border-blue-400/50 transition-all group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-blue-300" />
                    </div>
                    <span className="text-white font-medium flex-1 text-left">
                      Call
                    </span>
                  </button>
                )}

                {emailLink && (
                  <button
                    onClick={() => handleEmail(emailLink.url)}
                    className="w-full flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 hover:border-purple-400/50 transition-all group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-purple-300" />
                    </div>
                    <span className="text-white font-medium flex-1 text-left">
                      Email
                    </span>
                  </button>
                )}

                {whatsappLink && (
                  <button
                    onClick={() => handleWhatsApp(whatsappLink.url)}
                    className="w-full flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 hover:border-green-400/50 transition-all group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-6 h-6 text-green-300" />
                    </div>
                    <span className="text-white font-medium flex-1 text-left">
                      WhatsApp
                    </span>
                  </button>
                )}
              </div>

              {/* QR Code */}
              {/* <div className="bg-white p-6 rounded-2xl shadow-2xl">
                <QRCodeCanvas
                  value={profile.profileUrl}
                  size={200}
                  level="H"
                  includeMargin
                  className="mx-auto"
                />
                <p className="text-center text-xs text-gray-600 mt-3 font-medium">
                  Scan to save contact
                </p>
              </div> */}
            </div> 

            {/* Right Side - Social Links & Actions (60%) */}
            <div className="col-span-3 p-12">
              {/* Header Actions */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Connect With Me
                    </h2>
                    <p className="text-sm text-gray-400">
                      Find me on social media
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 text-white font-medium"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>

                  {/* <button
                    onClick={() => setShowQRModal(true)}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 text-white font-medium"
                  >
                    <QrCode className="w-5 h-5" />
                    QR
                  </button> */}
                  <button
                    onClick={handleDownloadVCard}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2 text-white font-semibold"
                  >
                    <Download className="w-5 h-5" />
                    Save
                  </button>
                </div>
              </div>

              {/* Social Links Grid */}
              {visibleLinks.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {visibleLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleSocialClick(link.id, link.url)}
                      className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 hover:from-white/20 hover:to-white/10 transition-all"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          {getPlatformIcon(link.platform)}
                        </div>
                        <span className="text-white font-medium capitalize text-sm">
                          {link.platform}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/10 group-hover:to-purple-600/10 transition-all"></div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-12 h-12 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-lg">
                    No social links available
                  </p>
                </div>
              )}

              {/* Powered By */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <span className="text-sm">Powered by</span>
                  <a
                    href="/"
                    className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                  >
                    Dot LinkMe
                  </a>
                  <span className="text-sm">• Smart NFC Digital Identity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
