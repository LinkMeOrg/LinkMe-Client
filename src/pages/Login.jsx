import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token && response.data.user) {
        login(response.data.token, response.data.user);

        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          confirmButtonText: "Continue",
        });

        const userRole = response.data.user.role;

        if (userRole === "user") {
          navigate("/");
        } else if (userRole === "business") {
          navigate("/business");
        } else {
          navigate("/");
        }
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "An error occurred. Please try again.";
      setError(msg);

      if (msg === "Please verify your email first") {
        Swal.fire({
          icon: "warning",
          title: "Verify Your Email",
          text: "Redirecting you to email verification...",
          timer: 3000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/verify-account");
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40";

  return (
    <div className="min-h-screen bg-brand-light">
      <section className="section-shell pt-28 pb-20 flex justify-center items-start">
        <div
          data-aos="fade-up"
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 md:p-10"
        >
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide">
              Welcome Back
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mt-1">
              Sign in to LinkMe
            </h1>
            <p className="text-gray-600 mt-3 text-sm">
              Access your digital identity and manage your profile.
            </p>
          </div>

          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className={inputClasses}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className={`${inputClasses} pr-10`}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="remember-me" className="text-xs text-gray-600">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-xs text-brand-primary font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

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
                  Processing...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="flex items-center justify-center my-6">
            <div className="h-px w-1/3 bg-gray-200"></div>
            <p className="mx-3 text-xs text-gray-500">or</p>
            <div className="h-px w-1/3 bg-gray-200"></div>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-brand-primary font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
