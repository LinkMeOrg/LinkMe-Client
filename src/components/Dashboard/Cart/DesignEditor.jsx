import React from "react";
import AIDesignPanel from "./AIDesignPanel";
import { templates, presetColors } from "../../../utils/constants";
import { adjustColorBrightness } from "../../../utils/cardUtils";
import { PaintBucket, Wand, Upload, Check } from "lucide-react";

export default function DesignEditor({
  currentDesign,
  onDesignChange,
  aiPrompt,
  onAiPromptChange,
  onGenerateAI,
  isGeneratingAI,
  onImageUpload,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <h3 className="font-semibold text-gray-900 mb-3">Customize Design</h3>

      {/* Design Mode Selector */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Design Mode</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() =>
              onDesignChange({
                ...currentDesign,
                designMode: "manual",
                aiBackground: null,
                uploadedImage: null,
              })
            }
            className={`p-3 rounded-lg border-2 text-center transition-all ${
              currentDesign.designMode === "manual"
                ? "border-brand-primary bg-brand-primary/5"
                : "border-gray-200 hover:border-brand-primary/50"
            }`}
          >
            <div className="text-2xl mb-1 flex justify-center">
              <PaintBucket className="h-6 w-6" />
            </div>
            <div className="text-[10px] font-medium">Manual</div>
          </button>

          <button
            type="button"
            onClick={() =>
              onDesignChange({ ...currentDesign, designMode: "ai" })
            }
            className={`p-3 rounded-lg border-2 text-center transition-all ${
              currentDesign.designMode === "ai"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-400"
            }`}
          >
            <div className="text-2xl mb-1 flex justify-center">
              <Wand className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-[10px] font-medium">AI</div>
          </button>

          <button
            type="button"
            onClick={() => document.getElementById("image-upload").click()}
            className={`p-3 rounded-lg border-2 text-center transition-all ${
              currentDesign.designMode === "upload"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-400"
            }`}
          >
            <div className="text-2xl mb-1 flex justify-center">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-[10px] font-medium">Upload</div>
          </button>
        </div>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
      </div>

      {/* AI Design Panel */}
      {currentDesign.designMode === "ai" && (
        <AIDesignPanel
          aiPrompt={aiPrompt}
          onPromptChange={onAiPromptChange}
          onGenerate={onGenerateAI}
          isGenerating={isGeneratingAI}
        />
      )}

      {/* Manual Design Options */}
      {currentDesign.designMode === "manual" && (
        <>
          {/* Template Selector */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Template</p>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() =>
                    onDesignChange({
                      ...currentDesign,
                      template: template.id,
                    })
                  }
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    currentDesign.template === template.id
                      ? "border-brand-primary bg-brand-primary/5"
                      : "border-gray-200 hover:border-brand-primary/50"
                  }`}
                >
                  <div className="text-2xl mb-1">{template.icon}</div>
                  <div className="text-[10px] font-medium">{template.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
            <div className="grid grid-cols-4 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    onDesignChange({
                      ...currentDesign,
                      color: color.value,
                    })
                  }
                  className={`h-10 rounded-lg border-2 transition-all ${
                    currentDesign.color === color.value
                      ? "border-brand-dark ring-2 ring-brand-primary/30 scale-110"
                      : "border-gray-200"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${
                      color.value
                    }, ${adjustColorBrightness(color.value, -20)})`,
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Upload Info */}
      {currentDesign.designMode === "upload" && currentDesign.uploadedImage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm font-semibold text-green-900 flex items-center gap-1">
            <Check className="h-4 w-4 text-green-700" />
            Custom Image Uploaded
          </p>
          <p className="text-xs text-green-700 mt-1">
            Your custom design is ready!
          </p>
          <button
            type="button"
            onClick={() => document.getElementById("image-upload").click()}
            className="mt-2 text-xs text-green-700 underline"
          >
            Upload Different Image
          </button>
        </div>
      )}
    </div>
  );
}
