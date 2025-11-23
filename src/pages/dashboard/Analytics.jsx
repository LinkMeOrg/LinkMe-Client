import React, { useState, useEffect } from "react";

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [days, setDays] = useState(30);
  const API_URL = import.meta.env.VITE_API_URL; // For Vite

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (selectedProfile) {
      fetchAnalytics(selectedProfile, days);
    }
  }, [selectedProfile, days]);

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/profiles`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      setProfiles(data.data || []);
      if (data.data?.length > 0) {
        setSelectedProfile(data.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (profileId, period) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/analytics/profile/${profileId}?days=${period}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      setAnalytics(data.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="card-glass p-12 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-brand-dark mb-2">
          No profiles yet
        </h3>
        <p className="text-gray-600">
          Create a profile to start tracking analytics
        </p>
      </div>
    );
  }

  const currentProfile = profiles.find((p) => p.id === selectedProfile);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-dark">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your profile performance</p>
      </div>

      <div className="card-glass p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Profile
            </label>
            <select
              value={selectedProfile || ""}
              onChange={(e) => setSelectedProfile(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
            >
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name} ({profile.profileType})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period
            </label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-glass p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                  👁️
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-brand-dark">
                    {analytics.analytics?.totalViews || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-glass p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                  👆
                </div>
                <div>
                  <p className="text-sm text-gray-600">Link Clicks</p>
                  <p className="text-2xl font-bold text-brand-dark">
                    {analytics.socialLinks?.reduce(
                      (sum, link) => sum + link.clickCount,
                      0
                    ) || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-glass p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                  📱
                </div>
                <div>
                  <p className="text-sm text-gray-600">Devices</p>
                  <p className="text-2xl font-bold text-brand-dark">
                    {analytics.analytics?.viewsByDevice?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-glass p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                  🌍
                </div>
                <div>
                  <p className="text-sm text-gray-600">Countries</p>
                  <p className="text-2xl font-bold text-brand-dark">
                    {analytics.analytics?.viewsByCountry?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-glass p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4">
                Views by Source
              </h2>
              {analytics.analytics?.viewsBySource?.length > 0 ? (
                <div className="space-y-3">
                  {analytics.analytics.viewsBySource.map((item) => (
                    <div
                      key={item.viewSource}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {item.viewSource === "nfc"
                            ? "📲"
                            : item.viewSource === "qr"
                            ? "📷"
                            : item.viewSource === "link"
                            ? "🔗"
                            : "🌐"}
                        </span>
                        <span className="font-medium capitalize">
                          {item.viewSource}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-brand-dark">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No views yet</p>
              )}
            </div>

            <div className="card-glass p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4">
                Top Locations
              </h2>
              {analytics.analytics?.viewsByCountry?.length > 0 ? (
                <div className="space-y-3">
                  {analytics.analytics.viewsByCountry
                    .slice(0, 5)
                    .map((item) => (
                      <div
                        key={item.viewerCountry}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">
                          {item.viewerCountry || "Unknown"}
                        </span>
                        <span className="text-lg font-bold text-brand-dark">
                          {item.count}
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">
                  No location data yet
                </p>
              )}
            </div>
          </div>

          <div className="card-glass p-6">
            <h2 className="text-xl font-bold text-brand-dark mb-4">
              Social Links Performance
            </h2>
            {analytics.socialLinks?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analytics.socialLinks.map((link) => (
                  <div
                    key={link.platform}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {link.platform === "linkedin"
                          ? "💼"
                          : link.platform === "github"
                          ? "💻"
                          : link.platform === "instagram"
                          ? "📸"
                          : link.platform === "twitter"
                          ? "🐦"
                          : "🔗"}
                      </span>
                      <div>
                        <p className="font-medium capitalize">
                          {link.platform}
                        </p>
                        <p className="text-sm text-gray-600">
                          {link.clickCount} clicks
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-brand-dark">
                        {link.clickCount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">
                No social links added yet
              </p>
            )}
          </div>

          <div className="card-glass p-6">
            <h2 className="text-xl font-bold text-brand-dark mb-4">
              Recent Views
            </h2>
            {analytics.analytics?.recentViews?.length > 0 ? (
              <div className="space-y-2">
                {analytics.analytics.recentViews.map((view, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span>
                        {view.device || "Unknown"} • {view.viewSource}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <span>
                        {view.viewerCity || "Unknown"},{" "}
                        {view.viewerCountry || "Unknown"}
                      </span>
                      <span>
                        {new Date(view.viewedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No views yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
