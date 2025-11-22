import React from "react";
import { Settings, Copy } from "lucide-react";

export default function SettingsTab({ profile, onCopyLink }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
      style={{
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">
            Profile Settings
          </h2>
          <p className="text-sm text-gray-600">
            Advanced configuration options
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Profile URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={profile.profileUrl}
              readOnly
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50"
            />
            <button
              onClick={() => onCopyLink(profile.profileUrl)}
              className="btn-ghost-clean px-4 py-3"
              title="Copy URL"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Slug */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Profile Slug
          </label>
          <input
            type="text"
            value={profile.slug}
            readOnly
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50"
          />
          <p className="text-xs text-gray-500 mt-2">
            This is your unique profile identifier
          </p>
        </div>

        {/* Profile Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Profile Type
          </label>
          <div className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 capitalize">
            {profile.profileType}
          </div>
        </div>
      </div>
    </div>
  );
}
