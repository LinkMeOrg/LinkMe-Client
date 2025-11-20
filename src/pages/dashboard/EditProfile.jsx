import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Copy,
  ExternalLink,
  Users,
  Link as LinkIcon,
  Activity,
  Settings,
  Share2,
  Check,
  X,
  Edit3,
  Image as ImageIcon,
} from "lucide-react";

export default function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    fetchProfile();
    fetchSocialLinks();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/profiles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setProfile(data.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/api/social-links/profile/${id}?includeHidden=true`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      setSocialLinks(data.data || []);
    } catch (error) {
      console.error("Error fetching social links:", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", profile.name);
      formData.append("title", profile.title || "");
      formData.append("bio", profile.bio || "");
      formData.append("color", profile.color);
      formData.append("template", profile.template);

      if (profile.avatarFile) {
        formData.append("avatar", profile.avatarFile);
      }

      const response = await fetch(`http://localhost:4000/api/profiles/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully!");
        fetchProfile();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setProfile({ ...profile, avatarUrl: url, avatarFile: file });
  };

  const handleAddSocialLink = async (platform, url) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/api/social-links", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: id,
          platform,
          url,
        }),
      });

      if (response.ok) {
        fetchSocialLinks();
      }
    } catch (error) {
      console.error("Error adding social link:", error);
    }
  };

  const handleDeleteSocialLink = async (linkId) => {
    if (!window.confirm("Delete this social link?")) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:4000/api/social-links/${linkId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setSocialLinks(socialLinks.filter((link) => link.id !== linkId));
    } catch (error) {
      console.error("Error deleting social link:", error);
    }
  };

  const handleToggleLinkVisibility = async (linkId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `http://localhost:4000/api/social-links/${linkId}/toggle-visibility`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSocialLinks(
        socialLinks.map((link) =>
          link.id === linkId ? { ...link, isVisible: !link.isVisible } : link
        )
      );
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${profile.slug}-qr-code.png`;
    link.href = url;
    link.click();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

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

  if (!profile) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-xl font-semibold text-gray-900 mb-2">
          Profile not found
        </p>
        <p className="text-gray-600 mb-6">
          The profile you're looking for doesn't exist
        </p>
        <button
          onClick={() => navigate("/dashboard/profiles")}
          className="btn-primary-clean px-6 py-3"
        >
          Back to Profiles
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/profiles")}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-brand-primary transition-colors" />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">
              Edit Profile
            </h1>
            <p className="text-gray-600 mt-1 text-lg">{profile.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/u/${profile.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-clean px-6 py-3 flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Live
          </a>
          <button
            onClick={() => copyToClipboard(profile.profileUrl)}
            className="btn-ghost-clean px-6 py-3 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="p-2 rounded-xl border border-gray-200 bg-white inline-flex gap-2"
        style={{
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        <button
          onClick={() => setActiveTab("basic")}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTab === "basic"
              ? "bg-gradient-to-r from-brand-primary to-blue-600 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          Basic Info
        </button>
        <button
          onClick={() => setActiveTab("links")}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTab === "links"
              ? "bg-gradient-to-r from-brand-primary to-blue-600 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          Social Links
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
            {socialLinks.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTab === "settings"
              ? "bg-gradient-to-r from-brand-primary to-blue-600 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Tab */}
          {activeTab === "basic" && (
            <form
              onSubmit={handleUpdateProfile}
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
                  <p className="text-sm text-gray-600">
                    Update your profile details
                  </p>
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
                          onChange={handleImageChange}
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
                    {profile.profileType === "personal"
                      ? "Full Name"
                      : "Company Name"}
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                    placeholder="Enter name"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {profile.profileType === "personal"
                      ? "Title / Role"
                      : "Industry"}
                  </label>
                  <input
                    type="text"
                    value={profile.title || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, title: e.target.value })
                    }
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
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
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
          )}

          {/* Social Links Tab */}
          {activeTab === "links" && (
            <div
              className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
              style={{
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-dark">
                      Social Links
                    </h2>
                    <p className="text-sm text-gray-600">
                      Manage your social media connections
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const platform = prompt(
                      "Platform (e.g., linkedin, github, twitter):"
                    );
                    const url = prompt("URL:");
                    if (platform && url) {
                      handleAddSocialLink(platform, url);
                    }
                  }}
                  className="btn-primary-clean px-6 py-3 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Link
                </button>
              </div>

              {socialLinks.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <LinkIcon className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    No social links yet
                  </p>
                  <p className="text-gray-600 mb-6">
                    Add your social media profiles to connect with your audience
                  </p>
                  <button
                    onClick={() => {
                      const platform = prompt("Platform:");
                      const url = prompt("URL:");
                      if (platform && url) handleAddSocialLink(platform, url);
                    }}
                    className="btn-primary-clean px-6 py-3 inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Link
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-brand-primary/50 hover:shadow-md transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/10 to-blue-100 flex items-center justify-center flex-shrink-0">
                        <LinkIcon className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-brand-dark capitalize">
                          {link.platform}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {link.url}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleLinkVisibility(link.id)}
                          className={`p-2.5 rounded-lg transition-all ${
                            link.isVisible
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          title={link.isVisible ? "Hide" : "Show"}
                        >
                          {link.isVisible ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteSocialLink(link.id)}
                          className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
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
                      onClick={() => copyToClipboard(profile.profileUrl)}
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

                {/* Template */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Template
                  </label>
                  <select
                    value={profile.template}
                    onChange={(e) =>
                      setProfile({ ...profile, template: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 capitalize"
                  >
                    <option value="modern">Modern</option>
                    <option value="gradient">Gradient</option>
                    <option value="glass">Glass</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* QR Code Card */}
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4"
            style={{
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-brand-dark">QR Code</h2>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center">
              <QRCodeCanvas
                id="qr-code"
                value={profile.profileUrl}
                size={180}
                level="H"
                includeMargin
              />
            </div>
            <button
              onClick={downloadQR}
              className="w-full btn-primary-clean py-3 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download QR Code
            </button>
          </div>

          {/* Quick Actions */}
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3"
            style={{
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          >
            <h3 className="font-bold text-brand-dark mb-4">Quick Actions</h3>
            <a
              href={`/u/${profile.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <ExternalLink className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">View Public Profile</p>
                <p className="text-xs text-gray-500">See how others see you</p>
              </div>
            </a>

            <button
              onClick={() => copyToClipboard(profile.profileUrl)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all w-full text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <Copy className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Copy Profile Link</p>
                <p className="text-xs text-gray-500">Share with anyone</p>
              </div>
            </button>

            <button
              onClick={() => navigate(`/dashboard/analytics`)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all w-full text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">View Analytics</p>
                <p className="text-xs text-gray-500">Track performance</p>
              </div>
            </button>
          </div>

          {/* Stats Card */}
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4"
            style={{
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-brand-dark">Statistics</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-brand-dark">
                      {profile.viewCount || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Social Links</p>
                    <p className="text-2xl font-bold text-brand-dark">
                      {socialLinks.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    {profile.isActive ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-lg font-bold">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          profile.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {profile.isActive ? "Active" : "Inactive"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
