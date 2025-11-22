import React from "react";

export default function ProfilePerformance({ profiles }) {
  return (
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
        {profiles.map((profile, index) => (
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
              <p className="text-xs text-gray-500 font-medium">total views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
