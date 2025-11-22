import React from "react";
import { Link } from "react-router-dom";
import { Edit, Eye, Share2, Pause, Play, Trash2, Link2 } from "lucide-react";
import ProfileCardPreview from "./ProfileCardPreview";

export default function ProfilesGrid({
  profiles,
  showQR,
  setShowQR,
  onShare,
  onCopyLink,
  onToggleStatus,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-brand-primary/50 transition-all duration-300 space-y-4"
        >
          {/* Card Preview */}
          <ProfileCardPreview
            profile={profile}
            onShare={onCopyLink}
            onToggleQR={(id) => setShowQR(showQR === id ? null : id)}
            showQR={showQR}
          />

          {/* Profile Info & Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <Link2 className="w-4 h-4" />
                <span className="font-medium">
                  {profile.socialLinks?.length || 0}
                </span>
              </div>
            </div>

            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${
                profile.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  profile.isActive ? "bg-green-500" : "bg-gray-500"
                }`}
              ></span>
              {profile.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
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

          {/* Delete Button */}
          <button
            onClick={() => onDelete(profile.id)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-medium text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete Profile
          </button>
        </div>
      ))}
    </div>
  );
}
