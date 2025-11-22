import React from "react";

export default function ColorPicker({ color, onChange }) {
  const presetColors = [
    {
      name: "LinkMe Blue",
      value: "#2563eb",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      name: "Purple",
      value: "#9333ea",
      gradient: "from-purple-600 to-purple-400",
    },
    { name: "Pink", value: "#ec4899", gradient: "from-pink-600 to-pink-400" },
    { name: "Red", value: "#ef4444", gradient: "from-red-600 to-red-400" },
    {
      name: "Orange",
      value: "#f97316",
      gradient: "from-orange-600 to-orange-400",
    },
    {
      name: "Green",
      value: "#10b981",
      gradient: "from-green-600 to-green-400",
    },
    { name: "Teal", value: "#14b8a6", gradient: "from-teal-600 to-teal-400" },
    {
      name: "Indigo",
      value: "#6366f1",
      gradient: "from-indigo-600 to-indigo-400",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-14 h-14 rounded-xl border-2 border-gray-300 cursor-pointer hover:border-brand-primary transition-all hover:scale-105"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xs">🎨</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-700">Custom Color</p>
          <p className="text-xs text-gray-500 font-mono">
            {color.toUpperCase()}
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1">
          <span>⭐</span> Quick Color Presets
        </p>
        <div className="grid grid-cols-4 gap-2">
          {presetColors.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => onChange(preset.value)}
              className={`
                relative h-12 rounded-lg border-2 transition-all hover:scale-110 bg-gradient-to-br ${
                  preset.gradient
                }
                ${
                  color.toLowerCase() === preset.value.toLowerCase()
                    ? "border-brand-dark shadow-lg scale-110 ring-2 ring-brand-primary/30"
                    : "border-gray-200 hover:border-gray-400"
                }
              `}
              title={preset.name}
            >
              {color.toLowerCase() === preset.value.toLowerCase() && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white drop-shadow-lg"
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
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
