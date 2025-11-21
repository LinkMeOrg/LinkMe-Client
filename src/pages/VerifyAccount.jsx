import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ NEW: Get location state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const returnTo = location.state?.returnTo; // ✅ NEW: Get returnTo from state

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:4000/auth/resend-otp", { email });

      await Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: "Check your inbox for your verification code.",
        confirmButtonText: "Continue",
      });

      // ✅ NEW: Pass returnTo to OTP verification page
      navigate("/verify-otp", {
        state: {
          email,
          returnTo, // Pass the returnTo path
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message || "Failed to send verification code.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40";

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center">
      <div
        data-aos="fade-up"
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide">
            Verify Email
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mt-1">
            Verify Your Account
          </h1>
          <p className="text-gray-600 mt-3 text-sm">
            Enter your email to receive a verification OTP.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary-clean py-3 text-base rounded-xl shadow-md"
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAccount;
