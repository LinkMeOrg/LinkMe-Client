import React from "react";
import { Edit3, Upload, Save, Image as ImageIcon } from "lucide-react";

export default function BasicInfoForm({
  profile,
  setProfile,
  saving,
  onSubmit,
  onImageChange,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
      style={{
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-blue-600 flex items-center justify-center">
          <Edit3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">
            Basic Information
          </h2>
          <p className="text-sm text-gray-600">Update your profile details</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Profile Image
          </label>
          <div className="flex items-center gap-6">
            <div className="relative group">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className={`w-24 h-24 object-cover ring-4 ring-gray-100 group-hover:ring-brand-primary/50 transition-all ${
                    profile.profileType === "personal"
                      ? "rounded-full"
                      : "rounded-2xl"
                  }`}
                />
              ) : (
                <div
                  className={`w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl ring-4 ring-gray-100 group-hover:ring-brand-primary/50 transition-all ${
                    profile.profileType === "personal"
                      ? "rounded-full"
                      : "rounded-2xl"
                  }`}
                >
                  {profile.profileType === "personal" ? "👤" : "🏢"}
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <label className="btn-ghost-clean px-6 py-3 cursor-pointer inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload New Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: Square image (1:1 ratio), max 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {profile.profileType === "personal" ? "Full Name" : "Company Name"}
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
            placeholder="Enter name"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {profile.profileType === "personal" ? "Title / Role" : "Industry"}
          </label>
          <input
            type="text"
            value={profile.title || ""}
            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
            placeholder={
              profile.profileType === "personal"
                ? "e.g. Software Engineer"
                : "e.g. Technology & Innovation"
            }
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bio / Description
          </label>
          <textarea
            rows={5}
            value={profile.bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all resize-none"
            placeholder="Tell people about yourself or your business..."
          />
          <p className="text-xs text-gray-500 mt-2">
            {profile.bio?.length || 0} / 500 characters
          </p>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Brand Color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={profile.color}
              onChange={(e) =>
                setProfile({ ...profile, color: e.target.value })
              }
              className="h-14 w-14 rounded-xl border-2 border-gray-300 cursor-pointer"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {profile.color}
              </p>
              <p className="text-xs text-gray-500">
                This color will be used for your profile theme
              </p>
            </div>
          </div>
        </div>

        {/* Template Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Card Template
          </label>
          <select
            value={profile.template}
            onChange={(e) =>
              setProfile({ ...profile, template: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary capitalize"
          >
            <option value="modern">Modern</option>
            <option value="gradient">Gradient</option>
            <option value="glass">Glass</option>
            <option value="dark">Dark</option>
            <option value="neon">Neon</option>
            <option value="elegant">Elegant</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            See the preview in the sidebar to see how your card will look
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary-clean w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-semibold"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving Changes...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}
