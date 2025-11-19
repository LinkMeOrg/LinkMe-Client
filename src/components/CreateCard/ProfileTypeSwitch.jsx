// src/components/CreateCard/ProfileTypeSwitch.jsx
import React from "react";

const PROFILE_TYPES = [
  { id: "personal", label: "👤 Personal Profile" },
  { id: "business", label: "💼 Business Profile" },
];

export default function ProfileTypeSwitch({ profileType, onSwitch }) {
  return (
    <div
      className="flex flex-wrap justify-center gap-4 mb-10"
      data-aos="fade-up"
    >
      {PROFILE_TYPES.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onSwitch(type.id)}
          className={`btn-ghost-clean px-8 py-3 rounded-2xl text-sm md:text-base transition-all ${
            profileType === type.id
              ? "bg-brand-primary text-white border-brand-primary shadow-md"
              : "hover:border-brand-primary/40"
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}
