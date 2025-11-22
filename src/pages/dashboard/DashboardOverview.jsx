import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/Dashboard/overview/DashboardHeader";
import StatsGrid from "../../components/Dashboard/overView/StatsGrid";
import ProfilesSection from "../../components/Dashboard/overview/Profilessection";
import RecentActivity from "../../components/Dashboard/overview/Recentactivity";
import ProfilePerformance from "../../components/Dashboard/overview/Profileperformance";
import QuickActions from "../../components/Dashboard/overview/Quickactions";
import LoadingSpinner from "../../components/Dashboard/overview/Loadingspinner";

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8 pb-8">
      <DashboardHeader userName={userName} />

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfilesSection profiles={profiles} />
        <RecentActivity activities={recentActivity} />
      </div>

      {stats?.profiles && stats.profiles.length > 0 && (
        <ProfilePerformance profiles={stats.profiles} />
      )}

      <QuickActions />
    </div>
  );
}
