import React, { useState } from "react";
import { generateAIImage } from "./Aiutils";
import {
  Sparkles,
  AlertTriangle,
  Palette,
  Lightbulb,
  Star,
  Loader2,
} from "lucide-react";

export default function AIDesignPanel({
  aiPrompt,
  onPromptChange,
  onGenerate,
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) {
      setError("Please enter a description for your card design");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const startTime = Date.now();

      const imageUrl = await generateAIImage(aiPrompt);

      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(imageUrl);
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageUrl;
      });

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(1500 - elapsedTime, 0);

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      onGenerate(imageUrl);
    } catch (err) {
      setError("Failed to generate or load AI design. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestedPrompts = [
    "Soft blue gradient with subtle glow and modern abstract shapes",
    "Elegant dark theme with gold accents and luxury feel",
    "Minimal white with pastel pink and blue touches",
    "Professional navy blue with silver geometric details",
    "Vibrant purple gradient with neon glow effects",
    "Emerald green with nature-inspired organic patterns",
  ];

  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200/50 p-4 space-y-3 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800 flex items-center gap-1">
            AI Design Generator
            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              FREE
            </span>
          </p>
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-2 animate-shake">
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" /> {error}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating || !aiPrompt.trim()}
        className={`
          w-full py-3 rounded-lg font-semibold text-sm transition-all
          ${
            isGenerating || !aiPrompt.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          }
          text-white
        `}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Generating & Loading...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Palette className="w-5 h-5" /> Generate AI Design
          </span>
        )}
      </button>

      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-700 flex items-center gap-1">
          <Lightbulb className="w-4 h-4" /> Try these prompts:
        </p>
        <div className="grid grid-cols-1 gap-2">
          {suggestedPrompts.slice(0, 3).map((prompt, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onPromptChange(prompt);
                setError(null);
              }}
              disabled={isGenerating}
              className={`text-xs px-3 py-2 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left ${
                isGenerating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-2.5">
        <p className="text-xs text-green-800 flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>
            <span className="font-semibold">Powered by Pollinations.AI</span> -
            Free unlimited AI image generation
          </span>
        </p>
      </div>
    </div>
  );
}
