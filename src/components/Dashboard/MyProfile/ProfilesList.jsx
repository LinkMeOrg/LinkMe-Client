import React from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { Edit, Eye, Share2, Link2, QrCode, Pause, Play } from "lucide-react";

export default function ProfilesList({
  profiles,
  showQR,
  setShowQR,
  onShare,
  onCopyLink,
  onToggleStatus,
}) {
  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-brand-primary/50 transition-all duration-300"
          style={{
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="flex items-center gap-6">
            {/* Profile Header */}
            <div className="flex-1 flex items-start gap-4">
              <div className="flex items-center gap-4">
                {profile.avatarUrl ? (
                  <div className="relative">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className={`w-16 h-16 object-cover ring-2 ring-gray-100 group-hover:ring-brand-primary/50 transition-all ${
                        profile.profileType === "personal"
                          ? "rounded-full"
                          : "rounded-xl"
                      }`}
                    />
                    {profile.isActive && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                ) : (
                  <div
                    className={`w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-3xl group-hover:from-brand-primary/10 group-hover:to-blue-100 transition-all relative ${
                      profile.profileType === "personal"
                        ? "rounded-full"
                        : "rounded-xl"
                    }`}
                  >
                    {profile.profileType === "personal" ? "👤" : "🏢"}
                    {profile.isActive && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-brand-dark group-hover:text-brand-primary transition-colors text-lg">
                    {profile.name}
                  </h3>
                  <p className="text-sm text-gray-600">{profile.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-brand-primary/10 to-blue-100 text-brand-primary font-medium capitalize">
                      {profile.profileType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{profile.viewCount || 0}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Link2 className="w-4 h-4" />
                <span className="font-medium">
                  {profile.socialLinks?.length || 0}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid gap-2 grid-cols-5">
              <Link
                to={`/dashboard/profiles/${profile.id}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-medium text-sm"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>

              <Link
                to={`/u/${profile.slug}`}
                target="_blank"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-blue-600 text-white hover:shadow-lg transition-all font-medium text-sm"
              >
                <Eye className="w-4 h-4" />
                View
              </Link>

              <button
                onClick={() => onShare(profile)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all font-medium text-sm"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              <button
                onClick={() =>
                  setShowQR(profile.id === showQR ? null : profile.id)
                }
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all font-medium text-sm"
              >
                <QrCode className="w-4 h-4" />
                QR
              </button>

              <button
                onClick={() => onToggleStatus(profile.id, profile.isActive)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium text-sm ${
                  profile.isActive
                    ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                    : "bg-green-50 text-green-600 hover:bg-green-100"
                }`}
              >
                {profile.isActive ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Activate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code */}
          {showQR === profile.id && (
            <div className="pt-4 border-t border-gray-200 w-full mt-4">
              <div className="bg-white p-4 rounded-xl flex flex-col items-center gap-3">
                <QRCodeCanvas
                  value={`${window.location.origin}/u/${profile.slug}`}
                  size={200}
                  level="H"
                  includeMargin
                />
                <button
                  onClick={() => onCopyLink(profile.slug)}
                  className="text-sm text-brand-primary hover:underline font-medium"
                >
                  Copy Profile Link
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
