import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";

export default function ProfilesSection({ profiles }) {
  return (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profiles.slice(0, 4).map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
