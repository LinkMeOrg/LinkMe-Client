import React from "react";

export default function StatCard({ icon, label, value, bgColor, gradient }) {
  return (
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
}
