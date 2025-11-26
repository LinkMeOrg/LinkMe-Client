import React from "react";
import {
  User,
  Briefcase,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Share2,
  Download,
  RefreshCw,
} from "lucide-react";

export default function ProfileHeader({
  profile,
  phoneLink,
  emailLink,
  whatsappLink,
  handleCall,
  handleEmail,
  handleWhatsApp,
  handleDownloadVCard,
  setShowShareModal,
  isFlipped,
  setIsFlipped,
}) {
  return (
    <div className="relative p-8 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.5) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.5) 0%, transparent 50%)",
          }}
        ></div>
      </div>

      {/* NFC Chip */}
      <div className="absolute top-6 right-6 z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
          <CheckCircle className="w-7 h-7 text-black" />
        </div>
      </div>

      {/* Profile Image */}
      <div className="relative flex justify-center mb-6 z-10">
        {profile.avatarUrl ? (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-50"></div>
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className={`relative w-32 h-32 object-cover border-4 border-white/20 shadow-2xl ${
                profile.profileType === "personal"
                  ? "rounded-full"
                  : "rounded-2xl"
              }`}
            />
          </div>
        ) : (
          <div
            className={`w-32 h-32 flex items-center justify-center text-5xl bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-white/20 shadow-2xl ${
              profile.profileType === "personal"
                ? "rounded-full"
                : "rounded-2xl"
            }`}
          >
            {profile.profileType === "personal" ? (
              <User className="w-5 h-5 text-gray-700" />
            ) : (
              <Briefcase className="w-5 h-5 text-gray-700" />
            )}
          </div>
        )}
      </div>

      {/* Name & Title */}
      <div className="text-center mb-6 relative z-10">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          {profile.name}
        </h1>
        {profile.title && (
          <p className="text-blue-400 text-lg font-medium">{profile.title}</p>
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <p className="text-xs text-gray-400">Type</p>
          <p className="text-white font-semibold capitalize">
            {profile.profileType}
          </p>
        </div>

        <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <p className="text-xs text-gray-400">Views</p>
          <p className="text-white font-semibold">{profile.viewCount || 0}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
        {phoneLink && (
          <button
            onClick={() => handleCall(phoneLink.url)}
            className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl border border-green-500/30 hover:border-green-400 transition-all"
          >
            <Phone className="w-6 h-6 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Call</span>
          </button>
        )}

        {emailLink && (
          <button
            onClick={() => handleEmail(emailLink.url)}
            className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl border border-blue-500/30 hover:border-blue-400 transition-all"
          >
            <Mail className="w-6 h-6 text-blue-400" />
            <span className="text-xs text-blue-400 font-medium">Email</span>
          </button>
        )}

        {whatsappLink && (
          <button
            onClick={() => handleWhatsApp(whatsappLink.url)}
            className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-2xl border border-emerald-500/30 hover:border-emerald-400 transition-all"
          >
            <MessageCircle className="w-6 h-6 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">Chat</span>
          </button>
        )}
      </div>

      {/* Action Buttons (Share & Save) */}
      <div className="grid grid-cols-2 gap-3 mb-2 mt-2">
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <Share2 className="w-5 h-5" />
          Share
        </button>

        <button
          onClick={handleDownloadVCard}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
        >
          <Download className="w-5 h-5" />
          Save
        </button>
      </div>

      {/* Flip Button */}
      <button
        onClick={() => setIsFlipped(true)}
        className="w-full mt-4 py-2 text-center text-gray-400 text-sm hover:text-white flex items-center justify-center gap-2 transition"
      >
        <RefreshCw className="w-4 h-4" />
        Tap to see more
      </button>
    </div>
  );
}
