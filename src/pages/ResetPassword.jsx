import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Shield, Check } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showPassword, setShowPassword] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL; // For Vite


  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Password strength requirements
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    newPassword
  );
  const passwordsMatch = newPassword === confirmPassword && newPassword !== "";

  // Countdown timer for redirection
  useEffect(() => {
    if (redirecting && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (redirecting && countdown === 0) {
      navigate("/login");
    }
  }, [redirecting, countdown, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        newPassword,
      });
      setMessage(response.data.message);
      setRedirecting(true); // Start countdown
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
              Password Reset
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mt-1">
              Create New Password
            </h1>
            <p className="text-gray-600 mt-3 text-sm">
              Set a strong password for your account.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div
              className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg flex items-start"
              role="alert"
            >
              <Check size={20} className="mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{message}</p>
                {redirecting && (
                  <p className="mt-1">
                    Redirecting to login in {countdown} seconds...
                  </p>
                )}
              </div>
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
            {/* New Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`${inputClasses} pl-10 pr-10`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-500" />
                  ) : (
                    <Eye size={20} className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield size={20} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`${inputClasses} pl-10`}
                />
              </div>
            </div>

            {/* Password strength indicator */}
            {newPassword.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-sm font-medium text-gray-700">
                  Password must contain:
                </p>
                <ul className="text-sm space-y-1.5">
                  <li
                    className={`flex items-center ${
                      hasMinLength ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full ${
                        hasMinLength ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {hasMinLength && (
                        <Check size={14} className="text-green-600" />
                      )}
                    </span>
                    At least 8 characters
                  </li>
                  <li
                    className={`flex items-center ${
                      hasUppercase ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full ${
                        hasUppercase ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {hasUppercase && (
                        <Check size={14} className="text-green-600" />
                      )}
                    </span>
                    At least one uppercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      hasLowercase ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full ${
                        hasLowercase ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {hasLowercase && (
                        <Check size={14} className="text-green-600" />
                      )}
                    </span>
                    At least one lowercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      hasNumber ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full ${
                        hasNumber ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {hasNumber && (
                        <Check size={14} className="text-green-600" />
                      )}
                    </span>
                    At least one number
                  </li>
                  <li
                    className={`flex items-center ${
                      hasSpecialChar ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full ${
                        hasSpecialChar ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {hasSpecialChar && (
                        <Check size={14} className="text-green-600" />
                      )}
                    </span>
                    At least one special character
                  </li>
                  {confirmPassword.length > 0 && (
                    <li
                      className={`flex items-center ${
                        passwordsMatch ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full ${
                          passwordsMatch ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {passwordsMatch && (
                          <Check size={14} className="text-green-600" />
                        )}
                      </span>
                      Passwords match
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || redirecting}
              className="w-full btn-primary-clean py-3 text-base rounded-xl shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-6"
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
                  Processing...
                </span>
              ) : redirecting ? (
                "Password Reset Successful!"
              ) : (
                "Reset Password"
              )}
            </button>

            {/* Back to Login */}
            {!redirecting && (
              <div className="text-center text-sm text-gray-600 pt-2">
                <p>
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="text-brand-primary font-medium hover:underline"
                  >
                    Back to Login
                  </Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
