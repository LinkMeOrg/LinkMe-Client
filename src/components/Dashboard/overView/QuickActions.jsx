import React from "react";
import { Link } from "react-router-dom";
import { BarChart2, Settings, Plus } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link
        to="/dashboard/analytics"
        className="card-glass p-6 hover:shadow-lg transition-all group border-2 border-transparent hover:border-brand-primary/20"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
            <BarChart2 className="w-6 h-6" />
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
            <Settings className="w-6 h-6" />
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
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </div>
          <div>
            <h3 className="font-semibold text-green-700">New Profile</h3>
            <p className="text-xs text-green-600">Create new card</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
