import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import SocialAuthButtons from "../components/SocialAuthButtons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const countryCodes = [
    { name: "Jordan", code: "+962", shortcut: "JO" },
    { name: "Saudi Arabia", code: "+966", shortcut: "SA" },
    { name: "UAE", code: "+971", shortcut: "AE" },
    { name: "Qatar", code: "+974", shortcut: "QA" },
    { name: "Kuwait", code: "+965", shortcut: "KW" },
    { name: "USA", code: "+1", shortcut: "US" },
    { name: "UK", code: "+44", shortcut: "GB" },
    { name: "Australia", code: "+61", shortcut: "AU" },
    { name: "Germany", code: "+49", shortcut: "DE" },
    { name: "France", code: "+33", shortcut: "FR" },
    { name: "Italy", code: "+39", shortcut: "IT" },
    { name: "Spain", code: "+34", shortcut: "ES" },
    { name: "Netherlands", code: "+31", shortcut: "NL" },
    { name: "Sweden", code: "+46", shortcut: "SE" },
    { name: "Norway", code: "+47", shortcut: "NO" },
    { name: "Denmark", code: "+45", shortcut: "DK" },
    { name: "Finland", code: "+358", shortcut: "FI" },
    { name: "Brazil", code: "+55", shortcut: "BR" },
    { name: "Mexico", code: "+52", shortcut: "MX" },
    { name: "Argentina", code: "+54", shortcut: "AR" },
    { name: "South Africa", code: "+27", shortcut: "ZA" },
    { name: "India", code: "+91", shortcut: "IN" },
    { name: "China", code: "+86", shortcut: "CN" },
    { name: "Japan", code: "+81", shortcut: "JP" },
    { name: "South Korea", code: "+82", shortcut: "KR" },
    { name: "Singapore", code: "+65", shortcut: "SG" },
    { name: "New Zealand", code: "+64", shortcut: "NZ" },
    { name: "Russia", code: "+7", shortcut: "RU" },
    { name: "Turkey", code: "+90", shortcut: "TR" },
    { name: "Egypt", code: "+20", shortcut: "EG" },
    { name: "Morocco", code: "+212", shortcut: "MA" },
    { name: "Nigeria", code: "+234", shortcut: "NG" },
    { name: "Kenya", code: "+254", shortcut: "KE" },
    { name: "Pakistan", code: "+92", shortcut: "PK" },
    { name: "Bangladesh", code: "+880", shortcut: "BD" },
    { name: "Thailand", code: "+66", shortcut: "TH" },
    { name: "Vietnam", code: "+84", shortcut: "VN" },
    { name: "Philippines", code: "+63", shortcut: "PH" },
    { name: "Malaysia", code: "+60", shortcut: "MY" },
  ];

  const [formData, setFormData] = useState({
    firstname: "",
    secondname: "",
    lastname: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [agree, setAgree] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ NEW: Get location state
  const API_URL = import.meta.env.VITE_API_URL; // For Vite

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check password strength when password field changes
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return "Weak";
    if (strength <= 3) return "Medium";
    return "Strong";
  };

  // Email format regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!agree) {
      setError("You must agree to the terms and conditions.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        firstName: formData.firstname,
        secondName: formData.secondname,
        lastName: formData.lastname,
        dateOfBirth: formData.dob,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
      };

      const response = await axios.post(
        `${API_URL}/auth/signup`,
        payload
      );

      if (response.status === 201) {
        // OTP required
        if (response.data.message?.includes("OTP")) {
          await Swal.fire({
            icon: "info",
            title: "OTP Verification Required",
            text: response.data.message,
            confirmButtonText: "OK",
          });
          navigate("/verify-otp", {
            state: {
              email: formData.email,
              returnTo: location.state?.returnTo, // ✅ NEW: Pass returnTo through OTP
            },
          });
        }
        // Direct login
        else if (response.data.token) {
          login(response.data.token, response.data.user);

          // ✅ NEW: Check if there's a returnTo path
          const returnTo = location.state?.returnTo;

          if (returnTo) {
            navigate(returnTo);
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      // Handle server/network errors
      const msg =
        error.response?.data?.message || "An error occurred during signup";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryCodeChange = (e) => {
    const selectedCode = e.target.value;

    setFormData((prev) => ({
      ...prev,
      phone: selectedCode, // inject phone code automatically
    }));
  };

  const inputClasses =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40";

  return (
    <div className="min-h-screen bg-brand-light">
      {/* WRAPPER */}
      <section className="section-shell pt-28 pb-20 flex justify-center items-start">
        <div
          data-aos="fade-up"
          className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 md:p-10"
        >
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide">
              Create Account
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mt-1">
              Join LinkMe Today
            </h1>
            <p className="text-gray-600 mt-3 text-sm">
              Start building your smart digital identity in seconds.
            </p>
          </div>

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
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* First Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="Khaled"
                required
                value={formData.firstname}
                onChange={handleChange}
                className={`${inputClasses} w-full`}
              />
            </div>

            {/* Second Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Second Name
              </label>
              <input
                type="text"
                name="secondname"
                placeholder="Mohammad"
                required
                value={formData.secondname}
                onChange={handleChange}
                className={`${inputClasses} w-full`}
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Ezat"
                required
                value={formData.lastname}
                onChange={handleChange}
                className={`${inputClasses} w-full`}
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <div className="flex gap-2">
                {/* Country Code Selector */}
                <select
                  className="
    w-40 
    border border-gray-300 
    rounded-2xl 
    px-4 py-2 
    text-sm 
    bg-white 
    shadow-sm 
    hover:border-gray-400 
    focus:outline-none 
    focus:ring-2 
    focus:ring-brand-primary/50 
    focus:border-brand-primary
    transition
    duration-200
    ease-in-out
  "
                  onChange={handleCountryCodeChange}
                >
                  <option value="">Select Country</option>
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.shortcut} {country.code} - {country.name}
                    </option>
                  ))}
                </select>

                {/* Phone Input */}
                <input
                  type="tel"
                  name="phone"
                  placeholder="+962 7X XXX XXXX"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${inputClasses} w-full`}
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
                className={`${inputClasses} w-full`}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
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
                className={`${inputClasses} w-full`}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className={`${inputClasses} w-full pr-10 h-12`} // fixed height
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center h-full" // full height + center
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500 mt-5" />
                ) : (
                  <Eye size={20} className="text-gray-500 mt-5" />
                )}
              </button>
              {passwordStrength && (
                <p
                  className={`text-xs mt-1 ${
                    passwordStrength === "Weak"
                      ? "text-red-500"
                      : passwordStrength === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  Password Strength: {passwordStrength}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col relative">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${inputClasses} w-full pr-10 h-12`} // fixed height
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center h-full" // full height + center
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} className="text-gray-500 mt-5" />
                ) : (
                  <Eye size={20} className="text-gray-500 mt-5" />
                )}
              </button>
            </div>

            {/* Terms */}
            <div className="col-span-1 md:col-span-2 flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4"
              />
              <p className="text-xs text-gray-600">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-brand-primary underline cursor-pointer"
                >
                  Terms & Conditions
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="col-span-1 md:col-span-2 btn-primary-clean w-full py-3 text-base rounded-xl shadow-md transition-colors"
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
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-6">
            <div className="h-px w-1/3 bg-gray-200"></div>
            <p className="mx-3 text-xs text-gray-500">or</p>
            <div className="h-px w-1/3 bg-gray-200"></div>
          </div>

          {/* Social Auth Buttons */}
          {/* <SocialAuthButtons /> */}

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600 mt-6">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                state={{ returnTo: location.state?.returnTo }} // ✅ NEW: Pass returnTo to login
                className="text-brand-primary font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
