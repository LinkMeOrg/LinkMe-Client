// src/layout/ScrollToTopButton.jsx
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const toggleVisibility = () => {
      let scrollTop = 0;

      if (isDashboard) {
        // For dashboard, check the main content scroll
        const mainContent = document.querySelector(
          "main.flex-1.h-full.overflow-y-auto"
        );
        scrollTop = mainContent?.scrollTop || 0;
      } else {
        // For other pages, check window scroll
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      }

      setIsVisible(scrollTop > 300);
    };

    if (isDashboard) {
      // Listen to dashboard main content scroll
      const mainContent = document.querySelector(
        "main.flex-1.h-full.overflow-y-auto"
      );
      if (mainContent) {
        mainContent.addEventListener("scroll", toggleVisibility);
        // Initial check
        toggleVisibility();
        return () =>
          mainContent.removeEventListener("scroll", toggleVisibility);
      }
    } else {
      // Listen to window scroll
      window.addEventListener("scroll", toggleVisibility);
      // Initial check
      toggleVisibility();
      return () => window.removeEventListener("scroll", toggleVisibility);
    }
  }, [isDashboard, location.pathname]);

  const scrollToTop = () => {
    if (isDashboard) {
      // Scroll dashboard main content
      const mainContent = document.querySelector(
        "main.flex-1.h-full.overflow-y-auto"
      );
      if (mainContent) {
        mainContent.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else {
      // Scroll window
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed z-50 group transition-all duration-300 hover:scale-110 ${
            isDashboard
              ? "bottom-6 right-6 lg:bottom-8 lg:right-8"
              : "bottom-8 right-8"
          }`}
          aria-label="Scroll to top"
        >
          <div className="relative">
            {/* Animated background blob */}
            <div className="absolute inset-0 bg-[#0066ff]/20 rounded-full blur-xl animate-blob"></div>

            {/* Button */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#0066ff] to-[#0052cc] rounded-full shadow-lg hover:shadow-xl flex items-center justify-center">
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
