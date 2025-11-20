import React from "react";

export default function ActionButtons({ isFlipped, setIsFlipped }) {
  return (
    <div className="w-full mt-4">
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full py-2 text-center text-gray-400 text-sm hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {isFlipped ? "Flip back" : "Tap to see more"}
      </button>
    </div>
  );
}
