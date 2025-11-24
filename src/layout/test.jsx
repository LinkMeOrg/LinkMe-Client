import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", role: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        const fullName = [data.firstName, data.secondName, data.lastName]
          .filter(Boolean)
          .join(" ");

        setUserInfo({
          name: fullName || "User",
          email: data.email || "",
          role: data.role || "user",
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    setTimeout(() => {
      logout();
    }, 1000);
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 500);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: "/dashboard",
      icon: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Overview",
      badge: null,
    },
    {
      path: "/dashboard/profiles",
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: "My Profiles",
      badge: null,
    },
    {
      path: "/dashboard/cart",
      icon: (
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      label: "Order Card",
      badge: null,
    },
    {
      path: "/dashboard/my-orders",
      icon: (
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h6m-6 4h6"
          />
        </svg>
      ),
      label: "My Orders",
      badge: null,
      roles: ["user", "business", "admin"],
    },
    {
      path: "/dashboard/analytics",
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      label: "Analytics",
    },
    {
      path: "/dashboard/admin/orders",
      icon: (
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      label: "Orders",
      badge: null,
    },
    {
      path: "/dashboard/settings",
      icon: (
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: "Settings",
      badge: null,
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link
          to="/"
          className="text-[22px] font-extrabold tracking-tight flex items-center gap-1"
        >
          <span className="text-brand-accent">Dot</span>
          <span className="text-brand-primary">LinkMe</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {sidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="flex h-screen pt-16 lg:pt-0">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-full flex flex-col overflow-hidden">
            {/* Logo Section - Fixed */}
            <div className="flex-shrink-0 p-6 border-b border-gray-100">
              <Link to="/" className="flex items-center gap-3 group">
                <div>
                  <div className="text-[22px] font-extrabold tracking-tight flex items-center gap-1">
                    <span className="text-brand-accent">Dot</span>
                    <span className="text-brand-primary">LinkMe</span>
                  </div>
                  <p className="text-xs text-gray-500">Smart NFC Platform</p>
                </div>
              </Link>
            </div>

            {/* User Profile Card - Fixed */}
            <div className="flex-shrink-0 p-4 border-b border-gray-100">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-brand-primary/5 to-blue-50 border border-brand-primary/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-blue-600 flex items-center justify-center text-white font-semibold shadow-md flex-shrink-0">
                  {userInfo.name.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {userInfo.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userInfo.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Menu - Scrollable */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Main Menu
              </p>
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-brand-primary to-blue-600 text-white shadow-lg shadow-brand-primary/30"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`transition-transform group-hover:scale-110 ${
                    isActive(item.path) ? "text-white" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-100 text-green-700">
                    {item.badge}
                  </span>
                )}
                {isActive(item.path) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                )}
              </Link>
            </nav>

            {/* Quick Actions - Fixed at bottom */}
            <div className="flex-shrink-0 p-4 border-t border-gray-100 space-y-2">
              <Link
                to="/create-card"
                className="flex items-center gap-3 px-4 py-3 rounded-xl btn-accent text-white hover:shadow-lg transition-all group"
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-90 transition-transform"
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
                <span className="font-medium">Create Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all group"
              >
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
