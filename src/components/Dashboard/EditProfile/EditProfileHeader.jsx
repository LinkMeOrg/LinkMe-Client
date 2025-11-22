import React from "react";
import { ArrowLeft, ExternalLink, Share2 } from "lucide-react";

export default function EditProfileHeader({ profile, onBack, onCopyLink }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-brand-primary transition-colors" />
        </button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">
            Edit Profile
          </h1>
          <p className="text-gray-600 mt-1 text-lg">{profile.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={`/u/${profile.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-clean px-6 py-3 flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          View Live
        </a>
        <button
          onClick={() => onCopyLink(profile.profileUrl)}
          className="btn-ghost-clean px-6 py-3 flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}
