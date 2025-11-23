import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL; // For Vite

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/auth/forgot-password`,
        {
          email,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40";

  return (
    <div className="min-h-screen bg-brand-light">
      {/* WRAPPER */}
      <section className="section-shell pt-28 pb-20 flex justify-center items-start">
        <div
          data-aos="fade-up"
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 md:p-10"
        >
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide">
              Password Recovery
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mt-1">
              Reset Your Password
            </h1>
            <p className="text-gray-600 mt-3 text-sm">
              Enter your email to receive a password reset link.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div
              className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
              role="alert"
            >
              {message}
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`${inputClasses} pl-10`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                We'll send instructions to reset your password to this email
                address.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary-clean py-3 text-base rounded-xl shadow-md transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Reset Instructions"
              )}
            </button>

            {/* Back to Login */}
            <div className="flex items-center justify-center pt-2">
              <Link
                to="/login"
                className="group flex items-center text-sm font-medium text-brand-primary hover:underline"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
