import React, { useState } from "react";
import AILogoGenerator from "./AILogoGenerator";

export default function ImageUpload({
  label,
  onChange,
  helperText,
  currentImage,
  isBusinessProfile,
  onAIGenerate,
}) {
  const [uploadMode, setUploadMode] = useState("upload"); // 'upload' or 'ai'

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {isBusinessProfile && (
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setUploadMode("upload");
            }}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
              uploadMode === "upload"
                ? "bg-white text-brand-primary shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            📤 Upload Logo
          </button>
          <button
            type="button"
            onClick={() => {
              setUploadMode("ai");
            }}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
              uploadMode === "ai"
                ? "bg-white text-brand-primary shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            ✨ AI Generate
          </button>
        </div>
      )}

      {uploadMode === "upload" && (
        <>
          {currentImage && (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-brand-primary/20 mx-auto">
              <img
                src={currentImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="w-full text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-brand-primary file:to-purple-600 file:text-white hover:file:from-brand-primary/90 hover:file:to-purple-600/90 file:cursor-pointer transition-all file:shadow-md hover:file:shadow-lg"
          />
          {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        </>
      )}

      {uploadMode === "ai" && isBusinessProfile && onAIGenerate && (
        <AILogoGenerator
          onGenerate={onAIGenerate}
          currentImage={currentImage}
        />
      )}
    </div>
  );
}
