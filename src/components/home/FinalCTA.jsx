import React from "react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section
      data-aos="fade-up"
      className="relative py-28 bg-white text-center overflow-hidden"
    >
      {/* Faint BIG background text */}
      <h1
        className="
          absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          text-[70px] md:text-[130px] lg:text-[170px]
          font-extrabold tracking-wider
          text-[#f2a91d]/20
          select-none pointer-events-none
          whitespace-nowrap
        "
      >
        START NOW
      </h1>

      <div className="section-shell relative z-10 space-y-8">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight">
          Start Your Smart Identity <br />
          <span className="text-brand-primary">in Seconds</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          Build your digital profile and share it anywhere with just one tap.
        </p>

        {/* Button */}
        <Link
          to="/create-card"
          className="
            inline-block px-12 py-4 text-lg font-semibold
            bg-brand-primary text-white rounded-xl
            shadow-lg hover:shadow-xl hover:scale-[1.03]
            transition-all duration-300
          "
        >
          Get Started Now
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;
