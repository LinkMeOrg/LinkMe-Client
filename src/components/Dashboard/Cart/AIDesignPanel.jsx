import React, { useState } from "react";
import { suggestedPrompts } from "../../../utils/constants";
import {
  Wand,
  AlertCircle,
  Lightbulb,
  Loader2,
  PaintBucket,
} from "lucide-react";

export default function AIDesignPanel({
  aiPrompt,
  onPromptChange,
  onGenerate,
  isGenerating,
}) {
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) {
      setError("Please enter a description for your card design");
      return;
    }
    setError(null);
    onGenerate();
  };

  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200/50 p-4 space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Wand className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">AI Design Generator</p>
          <p className="text-xs text-gray-600">
            Describe your ideal card design
          </p>
        </div>
      </div>

      <textarea
        value={aiPrompt}
        onChange={(e) => {
          onPromptChange(e.target.value);
          setError(null);
        }}
        placeholder="e.g. Modern gradient with neon glow effects and geometric patterns"
        rows={3}
        className="w-full border-2 border-purple-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 bg-white resize-none"
        disabled={isGenerating}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating || !aiPrompt.trim()}
        className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
          isGenerating || !aiPrompt.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700"
        } text-white`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" />
            Generating...
          </span>
        ) : (
          <span className="flex items-center gap-2 justify-center">
            <PaintBucket className="h-5 w-5" /> Generate AI Design
          </span>
        )}
      </button>

      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-700 flex items-center gap-1">
          <Lightbulb className="h-4 w-4" /> Try these:
        </p>
        <div className="grid grid-cols-1 gap-2">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onPromptChange(prompt)}
              disabled={isGenerating}
              className="text-xs px-3 py-2 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
