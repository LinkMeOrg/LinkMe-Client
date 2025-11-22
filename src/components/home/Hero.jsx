import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full min-h-screen bg-brand-gradient text-white flex items-center overflow-hidden">
      <div className="section-shell flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 px-4 sm:px-6 lg:px-8">
        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-4 sm:space-y-6 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Your Business Card Just Got{" "}
            <span className="text-brand-accent">Smarter</span>.
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-md">
            Dot LinkMe helps you share your identity instantly...
          </p>

          <ul className="text-gray-300 space-y-2 ml-1 text-sm sm:text-base">
            <li>⚡ Smart NFC Technology</li>
            <li>📊 Real-Time Analytics Dashboard</li>
            <li>🎨 Fully Customizable Digital Profile</li>
          </ul>

          <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
            <Link
              to="/create-card"
              className="btn-accent flex items-center gap-2 text-sm sm:text-base"
            >
              Get Your Smart Card
            </Link>
            <Link to="/gallery" className="btn-ghost text-sm sm:text-base">
              See Example Profile
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center relative animate-slideInRight first w-full">
          <img
            src="/images/hand-nfc.png"
            alt="Mockup"
            className="w-[280px] sm:w-[360px] md:w-[420px] lg:w-[460px] relative -bottom-16 sm:-bottom-24 md:-bottom-32 drop-shadow-2xl"
          />

          {/* glow */}
          <div className="absolute -z-10 blur-3xl opacity-40 bg-brand-primary w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] rounded-full bottom-0"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;