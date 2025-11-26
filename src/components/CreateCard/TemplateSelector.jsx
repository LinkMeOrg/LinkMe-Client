import React, { useState } from "react";
import { Image, Check } from "lucide-react";

export default function TemplateSelector({
  templates,
  selectedTemplate,
  onTemplateChange,
}) {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  return (
    <div className="space-y-3 pt-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Image className="w-4 h-4" /> Card Template
        </label>
        <span className="text-xs text-gray-500">Choose your card style</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const isHovered = hoveredTemplate === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onTemplateChange(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              className={`
                relative group border-2 rounded-xl p-3 text-left transition-all duration-300 
                ${
                  isSelected
                    ? "border-brand-primary bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 shadow-lg scale-[1.02]"
                    : "border-gray-200 hover:border-brand-primary/50 hover:shadow-md"
                }
                ${isHovered && !isSelected ? "scale-[1.01]" : ""}
              `}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center shadow-lg z-10">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`
                w-full h-16 rounded-lg mb-2 flex items-center justify-center text-2xl font-medium transition-all
                ${
                  isSelected
                    ? "bg-brand-primary/20"
                    : "bg-gray-100 group-hover:bg-brand-primary/10"
                }
              `}
              >
                {template.icon}
              </div>

              <div className="space-y-1">
                <p
                  className={`font-semibold text-sm transition-colors ${
                    isSelected
                      ? "text-brand-primary"
                      : "text-brand-dark group-hover:text-brand-primary"
                  }`}
                >
                  {template.name}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {template.description}
                </p>
              </div>

              {!isSelected && isHovered && (
                <div className="absolute inset-0 rounded-xl border-2 border-brand-primary/30 pointer-events-none"></div>
              )}
            </button>
          );
        })}
      </div>

      {selectedTemplate && (
        <div className="bg-gradient-to-r from-brand-primary/5 to-purple-500/5 border border-brand-primary/20 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">
              {templates.find((t) => t.id === selectedTemplate)?.icon}
            </span>
            <div>
              <p className="text-xs font-medium text-brand-dark">
                Selected:{" "}
                {templates.find((t) => t.id === selectedTemplate)?.name}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                {templates.find((t) => t.id === selectedTemplate)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
