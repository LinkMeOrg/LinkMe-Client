import React from "react";
import { RefreshCw } from "lucide-react";

export default function ActionButtons({ isFlipped, setIsFlipped }) {
  return (
    <div className="w-full mt-4">
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full py-2 text-center text-gray-400 text-sm hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        {isFlipped ? "Flip back" : "Tap to see more"}
      </button>
    </div>
  );
}
