import React from "react";
import ColorPicker from "./ColorPicker";
import AIDesignPanel from "./AIDesignPanel";

export default function DesignModeSection({ currentProfile, updateProfile }) {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span>🎨</span> Design Mode
        </label>
        <span className="text-xs text-gray-500">Choose how to customize</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => updateProfile({ designMode: "manual" })}
          className={`
            relative p-4 rounded-xl border-2 transition-all duration-300 text-left
            ${
              currentProfile.designMode === "manual"
                ? "border-brand-primary bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-brand-primary/50 hover:shadow-md"
            }
          `}
        >
          <div className="flex flex-col gap-2">
            <span className="text-3xl">🎨</span>
            <div>
              <p className="font-semibold text-sm text-brand-dark">Manual</p>
              <p className="text-xs text-gray-600 mt-1">
                Choose colors manually
              </p>
            </div>
          </div>
          {currentProfile.designMode === "manual" && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => updateProfile({ designMode: "ai" })}
          className={`
            relative p-4 rounded-xl border-2 transition-all duration-300 text-left
            ${
              currentProfile.designMode === "ai"
                ? "border-purple-500 bg-gradient-to-br from-purple-100 to-pink-50 shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-purple-400 hover:shadow-md"
            }
          `}
        >
          <div className="flex flex-col gap-2">
            <span className="text-3xl">✨</span>
            <div>
              <p className="font-semibold text-sm text-brand-dark flex items-center gap-1">
                AI-Powered
                <span className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                  FREE
                </span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Let AI design for you
              </p>
            </div>
          </div>
          {currentProfile.designMode === "ai" && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          )}
        </button>
      </div>

      {currentProfile.designMode === "manual" && (
        <div className="pt-2">
          <ColorPicker
            color={currentProfile.color}
            onChange={(color) => updateProfile({ color })}
          />
        </div>
      )}

      {currentProfile.designMode === "ai" && (
        <AIDesignPanel
          aiPrompt={currentProfile.aiPrompt}
          onPromptChange={(aiPrompt) => updateProfile({ aiPrompt })}
          onGenerate={(aiBackground) => updateProfile({ aiBackground })}
        />
      )}
    </div>
  );
}
