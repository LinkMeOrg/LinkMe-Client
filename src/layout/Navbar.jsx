import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "business";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Helper for NavLink class
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "nav-link-pro active text-brand-accent font-bold"
      : "nav-link-pro";

  const drawerLinkClass = ({ isActive }) =>
    isActive
      ? "drawer-link-pro active text-brand-accent font-bold"
      : "drawer-link-pro";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-[1000] transition-all duration-300
        ${
          scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm" : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* LOGO */}
        <NavLink
          to="/"
          className="text-[22px] font-extrabold tracking-tight flex items-center gap-1"
        >
          <span className="text-brand-accent">Dot</span>
          <span className="text-brand-primary">LinkMe</span>
        </NavLink>

        {/* DESKTOP NAV */}
        <ul className="hidden lg:flex items-center gap-10 text-[16px] font-medium text-gray-700">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-card" className={navLinkClass}>
              Create Card
            </NavLink>
          </li>
          <li>
            <NavLink to="/how-it-works" className={navLinkClass}>
              How It Works
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* DESKTOP BUTTONS */}
        <div className="hidden lg:flex items-center gap-4">
          {token ? (
            <>
              <NavLink to="/dashboard" className="btn-ghost-clean">
                Profile
              </NavLink>
              <button onClick={handleLogout} className="btn-primary-clean">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn-primary-clean">
              Sign In
            </NavLink>
          )}
        </div>

        {/* MOBILE ICON */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden text-[28px] text-gray-800"
        >
          ☰
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          <div
            className="
              fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-[1000]
              flex flex-col gap-6 px-7 pt-20 pb-10
              transition-transform duration-300 translate-x-0
            "
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-[28px] absolute top-5 right-6 text-gray-700"
            >
              ✕
            </button>

            <NavLink
              to="/"
              className={drawerLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/create-card"
              className={drawerLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Create Card
            </NavLink>
            <NavLink
              to="/how-it-works"
              className={drawerLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </NavLink>
            <NavLink
              to="/about"
              className={drawerLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={drawerLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>

            <div className="pt-6 flex flex-col gap-3">
              {token ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className="btn-ghost-clean text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="btn-primary-clean text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="btn-primary-clean text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
