import React from "react";
import { Link } from "react-router-dom";

const ProfilePreview = () => {
  return (
    <section data-aos="fade-up" className="py-24 bg-white  text-brand-dark ">
      <div className="section-shell text-center space-y-12">
        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold">
            See Your <span className="text-brand-primary">Smart Profile</span>
          </h2>
          <p className="text-gray-600  max-w-lg mx-auto">
            A clean, modern digital profile that shows your identity
            professionally.
          </p>
        </div>

        {/* PHONE MOCKUP WRAPPER */}
        <div className="flex justify-center">
          <div className="rounded-[32px] shadow-2xl border border-gray-200 bg-white p-6 w-[320px]">
            {/* Avatar */}
            <img
              src="/images/avatar-sample.png"
              alt="Profile Avatar"
              className="w-28 h-28 rounded-full mx-auto shadow"
            />

            {/* Name */}
            <div className="mt-6 space-y-1">
              <h3 className="text-2xl font-semibold">John Doe</h3>
              <p className="text-gray-600  text-sm">UI/UX Designer</p>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-3">
              <button className="w-full py-3 rounded-xl bg-brand-primary text-white font-medium hover:opacity-90 transition">
                WhatsApp
              </button>
              <button className="w-full py-3 rounded-xl bg-brand-primary text-white font-medium hover:opacity-90 transition">
                Instagram
              </button>
              <button className="w-full py-3 rounded-xl bg-brand-primary text-white font-medium hover:opacity-90 transition">
                Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/login"
          className="inline-block px-8 py-4 rounded-xl bg-brand-primary text-white shadow hover:opacity-90 transition"
        >
          Try Demo Profile
        </Link>
      </div>
    </section>
  );
};

export default ProfilePreview;
