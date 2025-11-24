import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Shield, Zap } from "lucide-react";

const FinalCTA = () => {
  return (
    <section
      data-aos="fade-up"
      className="relative py-20 sm:py-24 md:py-32 bg-gradient-to-br from-white via-[#f0f5ff] to-[#e6f0ff] overflow-hidden"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#0066ff]/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#f2a91d]/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0066ff]/8 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Faint BIG background text */}
      <h1
        className="
          absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          text-[40px] sm:text-[70px] md:text-[110px] lg:text-[150px]
          font-extrabold tracking-wider
          text-[#0066ff]/8
          select-none pointer-events-none
          whitespace-nowrap
        "
      >
        START NOW
      </h1>

      <div className="section-shell relative z-10 max-w-4xl mx-auto px-4">
        {/* Badge */}
        <div
          data-aos="zoom-in"
          data-aos-duration="500"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm border border-[#0066ff]/20 rounded-full shadow-sm"
        >
          <Sparkles size={16} className="text-[#f2a91d]" />
          <span className="text-sm font-medium text-[#0b0f19]">
            Join Thousands of Smart Networkers
          </span>
        </div>

        {/* Title */}
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0b0f19] leading-tight mb-6"
        >
          Start Your Smart Identity <br className="hidden sm:block" />
          <span className="relative inline-block">
            <span className="text-[#0066ff]">in Seconds</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#f2a91d]/60 via-[#f2a91d]/80 to-[#f2a91d]/60 rounded-full"></span>
          </span>
        </h2>

        {/* Subtitle */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10"
        >
          Build your digital profile and share it anywhere with just one tap.
          <br className="hidden sm:block" />
          <span className="text-gray-500">
            No apps, no hassle — just instant connections.
          </span>
        </p>

        {/* Buttons Group */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Link
            to="/create-card"
            className="
              group relative inline-flex items-center justify-center gap-2
              px-8 py-4 sm:px-10 sm:py-5
              text-base sm:text-lg font-bold
              bg-[#0066ff] text-white rounded-2xl
              shadow-[0_8px_30px_rgba(0,102,255,0.3)]
              hover:shadow-[0_12px_40px_rgba(0,102,255,0.4)]
              hover:scale-[1.02] hover:-translate-y-1
              transition-all duration-300
              overflow-hidden
              w-full sm:w-auto
            "
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#0066ff] to-[#0052cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Get Started Now</span>
            <ArrowRight
              size={20}
              className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>

          <Link
            to="/products"
            className="
              inline-flex items-center justify-center gap-2
              px-8 py-4 sm:px-10 sm:py-5
              text-base sm:text-lg font-semibold
              bg-white text-[#0066ff] border-2 border-[#0066ff]/30 rounded-2xl
              hover:bg-[#0066ff]/5 hover:border-[#0066ff]/50
              hover:scale-[1.02]
              transition-all duration-300
              w-full sm:w-auto
            "
          >
            View Products
          </Link>
        </div>

        {/* Trust Indicators */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-gray-600"
        >
          <div className="flex items-center gap-2">
            <Star size={20} className="text-[#f2a91d] fill-[#f2a91d]" />
            <span className="font-medium">No Setup Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-[#0066ff] fill-[#0066ff]" />
            <span className="font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-[#f2a91d] fill-[#f2a91d]" />
            <span className="font-medium">Instant Activation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
