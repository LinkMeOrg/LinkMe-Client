import React from "react";
import { Zap, UserCircle, BarChart2 } from "lucide-react";

const WhatIs = () => {
  return (
    <section data-aos="fade-up" className="py-20 bg-white  text-brand-dark ">
      <div className="section-shell grid md:grid-cols-2 gap-14 items-center">
        {/* ---------- RIGHT SIDE (TEXT AREA) ---------- */}
        <div className="space-y-6 order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
            What is{" "}
            <span className="text-brand-primary font-bold">
              <span style={{ color: "#f2a91d", fontWeight: "900" }}>Dot</span>{" "}
              LinkMe?
            </span>
          </h2>

          <p className="text-gray-600  text-lg leading-relaxed">
            Dot LinkMe is a next-generation NFC-powered identity solution that
            transforms how you share your digital presence. With a single tap,
            your profile, links, and branding become instantly accessible,
            making networking seamless, intelligent, and beautifully simple.
          </p>

          <p className="text-gray-600  text-lg leading-relaxed">
            Our platform adapts to your lifestyle—giving you full control over
            updates, analytics, and your professional identity through a smart,
            dynamic interface.
          </p>
        </div>

        {/* ---------- LEFT SIDE (ICON CARDS) ---------- */}
        <div className="space-y-6 order-1 md:order-2">
          <div
            data-aos="fade-left"
            className="card-glass p-6 flex gap-4 items-start"
          >
            <Zap size={42} className="text-brand-primary" />
            <div>
              <h3 className="text-xl font-semibold">One Tap Identity</h3>
              <p className="text-gray-600 ">
                Share all your contact info instantly using NFC or QR.
              </p>
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-delay="150"
            className="card-glass p-6 flex gap-4 items-start"
          >
            <UserCircle size={42} className="text-brand-primary" />
            <div>
              <h3 className="text-xl font-semibold">Personal Profile Page</h3>
              <p className="text-gray-600 ">
                A personalized digital profile with your bio, links, and
                branding.
              </p>
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-delay="300"
            className="card-glass p-6 flex gap-4 items-start"
          >
            <BarChart2 size={42} className="text-brand-primary" />
            <div>
              <h3 className="text-xl font-semibold">Smart Analytics</h3>
              <p className="text-gray-600 ">
                Track visits, clicks, and views in real-time from your
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIs;
