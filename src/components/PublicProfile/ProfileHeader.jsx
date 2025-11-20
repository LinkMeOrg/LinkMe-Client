import React from "react";

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
          <svg
            className="w-7 h-7 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
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
            {profile.profileType === "personal" ? "👤" : "🏢"}
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
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28l1.498 4.493-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257 4.493 1.498V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-xs text-green-400 font-medium">Call</span>
          </button>
        )}

        {emailLink && (
          <button
            onClick={() => handleEmail(emailLink.url)}
            className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl border border-blue-500/30 hover:border-blue-400 transition-all"
          >
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs text-blue-400 font-medium">Email</span>
          </button>
        )}

        {whatsappLink && (
          <button
            onClick={() => handleWhatsApp(whatsappLink.url)}
            className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-2xl border border-emerald-500/30 hover:border-emerald-400 transition-all"
          >
            <svg
              className="w-6 h-6 text-emerald-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"></path>
            </svg>
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
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </button>

        <button
          onClick={handleDownloadVCard}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Save
        </button>
      </div>

      {/* Flip Button */}
      <button
        onClick={() => setIsFlipped(true)}
        className="w-full mt-4 py-2 text-center text-gray-400 text-sm hover:text-white flex items-center justify-center gap-2 transition"
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
          ></path>
        </svg>
        Tap to see more
      </button>
    </div>
  );
}
