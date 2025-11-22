import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function ProfilesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">
          My Profiles
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Manage and track all your digital cards
        </p>
      </div>
      <Link
        to="/create-card"
        className="btn-primary-clean px-8 py-4 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all group"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="font-semibold">Create New Profile</span>
      </Link>
    </div>
  );
}
