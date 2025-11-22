import React from "react";
import { formatDate } from "./Dashboardutils";

export default function RecentActivity({ activities }) {
  return (
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
          <h2 className="text-xl font-bold text-brand-dark">Recent Activity</h2>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📊</div>
            <p className="text-sm text-gray-500">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
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
  );
}
