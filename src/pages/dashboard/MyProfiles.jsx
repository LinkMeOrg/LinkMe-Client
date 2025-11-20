import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Swal from "sweetalert2";

export default function MyProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showQR, setShowQR] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/api/profiles", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setProfiles(data.data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (profileId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `http://localhost:4000/api/profiles/${profileId}/toggle-status`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfiles(
        profiles.map((p) =>
          p.id === profileId ? { ...p, isActive: !currentStatus } : p
        )
      );
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleDeleteProfile = async (profileId) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:4000/api/profiles/${profileId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfiles(profiles.filter((p) => p.id !== profileId));
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleShare = async (profile) => {
    const shareUrl = `${window.location.origin}/u/${profile.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: profile.bio,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Copied!",
            text: "Link copied to clipboard!",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: "top-end",
          });
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Failed to copy link.",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: "top-end",
          });
        });
    }
  };

  const handleCopyLink = (slug) => {
    const url = `${window.location.origin}/u/${slug}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "Link copied to clipboard!",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to copy link.",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      });
  };

  const filteredProfiles = profiles.filter((profile) => {
    if (filter === "all") return true;
    if (filter === "personal") return profile.profileType === "personal";
    if (filter === "business") return profile.profileType === "business";
    if (filter === "active") return profile.isActive;
    if (filter === "inactive") return !profile.isActive;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-brand-primary"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-brand-primary/20 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">
            My Profiles
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage and track all your digital cards
          </p>
        </div>
        <Link
          to="/create-card"
          className="btn-primary-clean px-8 py-4 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all group"
        >
          <svg
            className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="font-semibold">Create New Profile</span>
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="p-4 rounded-xl border border-gray-200 bg-white"
          style={{
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          <p className="text-sm text-gray-600">Total Profiles</p>
          <p className="text-2xl font-bold text-brand-dark">
            {profiles.length}
          </p>
        </div>
        <div
          className="p-4 rounded-xl border border-gray-200 bg-white"
          style={{
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {profiles.filter((p) => p.isActive).length}
          </p>
        </div>
        <div
          className="p-4 rounded-xl border border-gray-200 bg-white"
          style={{
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          <p className="text-sm text-gray-600">Total Views</p>
          <p className="text-2xl font-bold text-blue-600">
            {profiles.reduce((sum, p) => sum + (p.viewCount || 0), 0)}
          </p>
        </div>
        <div
          className="p-4 rounded-xl border border-gray-200 bg-white"
          style={{
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          <p className="text-sm text-gray-600">Personal</p>
          <p className="text-2xl font-bold text-purple-600">
            {profiles.filter((p) => p.profileType === "personal").length}
          </p>
        </div>
      </div>

      {/* Filters and View Mode */}
      <div
        className="p-6 rounded-xl border border-gray-200 bg-white"
        style={{
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "All Profiles", icon: "📊" },
              { value: "personal", label: "Personal", icon: "👤" },
              { value: "business", label: "Business", icon: "🏢" },
              { value: "active", label: "Active", icon: "✅" },
              { value: "inactive", label: "Inactive", icon: "⏸️" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  filter === item.value
                    ? "bg-gradient-to-r from-brand-primary to-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-brand-primary"
                  : "text-gray-600 hover:text-brand-primary"
              }`}
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-brand-primary"
                  : "text-gray-600 hover:text-brand-primary"
              }`}
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Profiles Grid/List */}
      {filteredProfiles.length === 0 ? (
        <div
          className="p-16 text-center rounded-xl border border-gray-200 bg-white"
          style={{
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-brand-dark mb-3">
            No profiles found
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {filter === "all"
              ? "Create your first smart digital card and start connecting with people"
              : `No ${filter} profiles found. Try adjusting your filters.`}
          </p>
          {filter === "all" && (
            <Link
              to="/create-card"
              className="btn-primary-clean px-8 py-4 inline-flex items-center gap-2 shadow-lg"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Your First Profile
            </Link>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className={`group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-brand-primary/50 transition-all duration-300 ${
                viewMode === "list" ? "flex items-center gap-6" : "space-y-4"
              }`}
              style={{
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              }}
            >
              {/* Profile Header */}
              <div
                className={`flex items-start ${
                  viewMode === "list" ? "flex-1 gap-4" : "justify-between"
                }`}
              >
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

                {viewMode === "grid" && (
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
                )}
              </div>

              {/* Profile Bio */}
              {viewMode === "grid" && (
                <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                  {profile.bio || "No description provided"}
                </p>
              )}

              {/* Stats */}
              <div
                className={`flex items-center gap-6 text-sm ${
                  viewMode === "list" ? "flex-1" : ""
                }`}
              >
                <div className="flex items-center gap-2 text-gray-600">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="font-medium">{profile.viewCount || 0}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span className="font-medium">
                    {profile.socialLinks?.length || 0}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={`grid gap-2 ${
                  viewMode === "list" ? "grid-cols-5" : "grid-cols-2"
                }`}
              >
                <Link
                  to={`/dashboard/profiles/${profile.id}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-medium text-sm"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </Link>

                <Link
                  to={`/u/${profile.slug}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-blue-600 text-white hover:shadow-lg transition-all font-medium text-sm"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View
                </Link>

                <button
                  onClick={() => handleShare(profile)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all font-medium text-sm"
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share
                </button>

                <button
                  onClick={() =>
                    setShowQR(profile.id === showQR ? null : profile.id)
                  }
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all font-medium text-sm"
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
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                  QR
                </button>

                <button
                  onClick={() =>
                    handleToggleStatus(profile.id, profile.isActive)
                  }
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium text-sm ${
                    profile.isActive
                      ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }`}
                >
                  {profile.isActive ? (
                    <>
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
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
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
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Activate
                    </>
                  )}
                </button>
              </div>

              {/* QR Code */}
              {showQR === profile.id && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-white p-4 rounded-xl flex flex-col items-center gap-3">
                    <QRCodeCanvas
                      value={`${window.location.origin}/u/${profile.slug}`}
                      size={200}
                      level="H"
                      includeMargin
                    />
                    <button
                      onClick={() => handleCopyLink(profile.slug)}
                      className="text-sm text-brand-primary hover:underline font-medium"
                    >
                      Copy Profile Link
                    </button>
                  </div>
                </div>
              )}

              {/* Delete Button */}
              {viewMode === "grid" && (
                <button
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-medium text-sm"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete Profile
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
