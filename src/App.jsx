import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

// Layout
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

// Pages
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
import Terms from "./pages/Terms";
import CreateCard from "./pages/CreateCard";
import PublicProfile from "./pages/PublicProfile";
import HowItWorks from "./pages/HowItWorks";
import VerifyAccount from "./pages/VerifyAccount";

// Dashboard
import DashboardLayout from "./layout/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import MyProfiles from "./pages/dashboard/MyProfiles";
import EditProfile from "./pages/dashboard/EditProfile";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";

// Helpers
import ScrollToTopButton from "./layout/ScrollToTopButton";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Gellary from "./pages/Gellary";

/* ---------- SCROLL TO TOP COMPONENT ---------- */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const location = useLocation();

  const hideNavbarFooterPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/dashboard",
    "/u/",
  ];

  const shouldHideNavbarFooter = hideNavbarFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <ScrollToTop /> {/* <-- Added ScrollToTop */}
      {!shouldHideNavbarFooter && <Navbar />}
      <Routes>
        {/* ---------- GUEST ONLY ---------- */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/oauth-success" element={<OAuthSuccessWrapper />} />
        <Route path="/verify-otp" element={<OTPVerify />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/u/:slug" element={<PublicProfile />} />
        <Route path="/create-card" element={<CreateCard />} />
        <Route path="/gallery" element={<Gellary />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ---------- PROTECTED USER ROUTES ---------- */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ---------- PROTECTED DASHBOARD ---------- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="profiles" element={<MyProfiles />} />
          <Route path="profiles/:id" element={<EditProfile />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
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
