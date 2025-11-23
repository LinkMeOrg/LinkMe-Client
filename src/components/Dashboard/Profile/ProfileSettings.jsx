import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Calendar, Mail, Phone, Save, Loader2 } from "lucide-react";

export default function ProfileSettings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const API_URL = import.meta.env.VITE_API_URL; // For Vite

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/api/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage({ type: "error", text: "Failed to fetch user data" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/me`,
        {
          firstName: user.firstName,
          secondName: user.secondName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth,
          email: user.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error updating profile",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="card-glass p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-purple-600 flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">
            Profile Settings
          </h2>
          <p className="text-sm text-gray-600">
            Update your personal information
          </p>
        </div>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div onSubmit={handleUpdateProfile} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={user?.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                placeholder="Enter your first name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Second Name
            </label>
            <input
              type="text"
              value={user?.secondName || ""}
              onChange={(e) => handleInputChange("secondName", e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              placeholder="Enter your second name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={user?.lastName || ""}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              placeholder="Enter your last name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700  items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <input
              type="tel"
              value={user?.phoneNumber || ""}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              placeholder="+962 XX XXX XXXX"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700  items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date of Birth
            </label>
            <input
              type="date"
              value={user?.dateOfBirth || ""}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700  items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Account Created:</span>{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </p>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            onClick={handleUpdateProfile}
            disabled={saving}
            className="btn-primary-clean px-8 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
