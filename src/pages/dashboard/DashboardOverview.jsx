import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [summaryRes, profilesRes, activityRes, userRes] = await Promise.all(
        [
          fetch("http://localhost:4000/api/dashboard/summary", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:4000/api/profiles", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:4000/api/dashboard/recent-activity?limit=5", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:4000/api/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]
      );

      const summaryData = await summaryRes.json();
      const profilesData = await profilesRes.json();
      const activityData = await activityRes.json();
      const userData = await userRes.json();

      setStats(summaryData.data);
      setProfiles(profilesData.data || []);
      setRecentActivity(activityData.data?.recentUpdates || []);

      const fullName = [
        userData.firstName,
        userData.secondName,
        userData.lastName,
      ]
        .filter(Boolean)
        .join(" ");
      setUserName(fullName || "User");
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
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

  const StatCard = ({ icon, label, value, bgColor, gradient }) => (
    <div className="relative group">
      <div
        className="p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{
          background: "white",
          borderRadius: "1rem",
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">{label}</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">
              {value}
            </p>
          </div>
        </div>
        {gradient && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-primary/5 to-transparent rounded-full blur-2xl -z-10"></div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Here's what's happening with your profiles today
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
          label="Total Profiles"
          value={stats?.totalProfiles || 0}
          bgColor="bg-gradient-to-br from-brand-primary to-blue-600 text-white"
          gradient={true}
        />
        <StatCard
          icon={
            <svg
              className="w-7 h-7"
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
          }
          label="Total Views"
          value={stats?.totalViews || 0}
          bgColor="bg-gradient-to-br from-green-500 to-emerald-600 text-white"
        />
        <StatCard
          icon={
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
          }
          label="Total Clicks"
          value={stats?.totalClicks || 0}
          bgColor="bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
        />
        <StatCard
          icon={
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          label="Active Profiles"
          value={stats?.activeProfiles || 0}
          bgColor="bg-gradient-to-br from-purple-500 to-pink-600 text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Your Profiles Section */}
        <div className="lg:col-span-2">
          <div className="card-glass p-6 md:p-8 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-brand-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Your Profiles
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and track your digital cards
                </p>
              </div>
              <Link
                to="/dashboard/profiles"
                className="text-sm font-medium text-brand-primary hover:text-blue-600 transition-colors flex items-center gap-1 group"
              >
                View all
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {profiles.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-primary/10 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-brand-primary"
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
                  No profiles yet
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Create your first smart digital card and start connecting with
                  people in a whole new way
                </p>
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
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profiles.slice(0, 4).map((profile) => (
                  <Link
                    key={profile.id}
                    to={`/dashboard/profiles/${profile.id}`}
                    className="group border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-brand-primary/50 transition-all duration-300 bg-white"
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
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-3xl group-hover:from-brand-primary/10 group-hover:to-blue-100 transition-all ${
                            profile.profileType === "personal"
                              ? "rounded-full"
                              : "rounded-xl"
                          }`}
                        >
                          {profile.profileType === "personal" ? "👤" : "🏢"}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-brand-dark group-hover:text-brand-primary transition-colors truncate">
                          {profile.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {profile.title || "No title"}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-brand-primary/10 to-blue-100 text-brand-primary font-medium capitalize">
                            {profile.profileType}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
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
                            {profile.viewCount || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="card-glass p-6 h-full">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-6 h-6 text-brand-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-xl font-bold text-brand-dark">
                Recent Activity
              </h2>
            </div>

            {recentActivity.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📊</div>
                <p className="text-sm text-gray-500">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${
                        activity.profileType === "personal"
                          ? "bg-blue-100"
                          : "bg-purple-100"
                      }`}
                    >
                      {activity.profileType === "personal" ? "👤" : "🏢"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-dark truncate">
                        {activity.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Updated {formatDate(activity.updatedAt)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">
                          {activity.viewCount || 0} views
                        </span>
                        {activity.isActive && (
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Performance */}
      {stats?.profiles && stats.profiles.length > 0 && (
        <div className="card-glass p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <svg
              className="w-6 h-6 text-brand-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-brand-dark">
              Profile Performance
            </h2>
          </div>
          <div className="space-y-3">
            {stats.profiles.map((profile, index) => (
              <div
                key={profile.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-primary/30 hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-transparent transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/10 to-blue-100 flex items-center justify-center text-2xl font-bold text-brand-primary">
                    #{index + 1}
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`text-3xl ${
                        profile.type === "personal"
                          ? "filter grayscale-0"
                          : "filter grayscale-0"
                      }`}
                    >
                      {profile.type === "personal" ? "👤" : "🏢"}
                    </div>
                    <div>
                      <p className="font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                        {profile.name}
                      </p>
                      <p className="text-sm text-gray-500 capitalize flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {profile.type}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">
                    {profile.views}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    total views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/dashboard/analytics"
          className="card-glass p-6 hover:shadow-lg transition-all group border-2 border-transparent hover:border-brand-primary/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-brand-dark">View Analytics</h3>
              <p className="text-xs text-gray-500">Detailed insights</p>
            </div>
          </div>
        </Link>

        <Link
          to="/dashboard/settings"
          className="card-glass p-6 hover:shadow-lg transition-all group border-2 border-transparent hover:border-brand-primary/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-brand-dark">Settings</h3>
              <p className="text-xs text-gray-500">Manage account</p>
            </div>
          </div>
        </Link>

        <Link
          to="/create-card"
          className="card-glass p-6 hover:shadow-lg transition-all group border-2 border-transparent hover:border-green-500/20 bg-gradient-to-br from-green-50 to-emerald-50"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
              <svg
                className="w-6 h-6 group-hover:rotate-90 transition-transform"
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
            </div>
            <div>
              <h3 className="font-semibold text-green-700">New Profile</h3>
              <p className="text-xs text-green-600">Create new card</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
