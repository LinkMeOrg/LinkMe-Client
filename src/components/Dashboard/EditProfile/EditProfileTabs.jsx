import React from "react";
import { Edit3, Link as LinkIcon, Settings } from "lucide-react";

export default function EditProfileTabs({
  activeTab,
  setActiveTab,
  socialLinksCount,
}) {
  const tabs = [
    { id: "basic", label: "Basic Info", icon: Edit3 },
    {
      id: "links",
      label: "Social Links",
      icon: LinkIcon,
      count: socialLinksCount,
    },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className="p-2 rounded-xl border border-gray-200 bg-white inline-flex gap-2"
      style={{
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-brand-primary to-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
            {tab.count !== undefined && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
