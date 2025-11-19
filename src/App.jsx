import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import About from "./pages/About";
import OAuthSuccessWrapper from "./components/OAuthSuccessWrapper";
import OTPVerify from "./pages/OTPVerify";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbarFooterPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  const shouldHideNavbarFooter = hideNavbarFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const user = JSON.parse(localStorage.getItem("user"));

  const isUser = user?.role === "user";

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/oauth-success" element={<OAuthSuccessWrapper />} />
        <Route path="/verify-otp" element={<OTPVerify />} />
      </Routes>
      {!shouldHideNavbarFooter && <Footer />}
      <ScrollToTopButton />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
