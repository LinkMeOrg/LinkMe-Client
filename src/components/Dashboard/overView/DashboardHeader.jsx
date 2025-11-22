import React from "react";
import { Link } from "react-router-dom";

export default function DashboardHeader({ userName }) {
  return (
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
  );
}
