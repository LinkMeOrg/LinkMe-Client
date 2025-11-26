import React from "react";
import { X } from "lucide-react";

export default function TemplateGuide({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Card Template Guide</h3>
        <button
          onClick={onClose}
          aria-label="Close guide"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Dimensions Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Standard NFC Card Dimensions:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Size: 85.6mm × 54mm (Credit card size)</li>
            <li>• Aspect Ratio: 16:10</li>
            <li>• Recommended Image: 800 × 450px minimum</li>
            <li>• Safe Zone: Keep important content 5mm from the edges</li>
          </ul>
        </div>

        {/* Tip Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-900 leading-relaxed">
            <span className="font-semibold">Tip:</span> Leave space in the
            top-left corner for your logo or profile image, as it will be placed
            there automatically when generating your card.
          </p>
        </div>

        {/* Template Image */}
        <div>
          <img
            src="/card-template-guide.png"
            alt="Card template visual guide"
            className="w-full rounded-lg border"
            onError={(e) => {
              e.target.style.display = "none";
              const fallback = e.target.parentNode.querySelector(
                ".fallback-card-image"
              );
              if (fallback) fallback.style.display = "flex";
            }}
          />

          {/* Fallback */}
          <div className="fallback-card-image bg-gray-100 rounded-lg p-8 text-center hidden justify-center items-center">
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Card Template Visualization
              </p>
              <p className="mt-2 text-xs text-gray-500">85.6mm × 54mm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
