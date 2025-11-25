import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, ChevronDown, Search } from "lucide-react";
import SocialAuthButtons from "../components/SocialAuthButtons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TermsModal from "../components/TermsModal";
import Swal from "sweetalert2";
import ReactCountryFlag from "react-country-flag";
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";

const SignUp = () => {
  const countryCodes = [
    {
      name: "Jordan",
      code: "+962",
      shortcut: "JO",
      flag: (
        <ReactCountryFlag
          countryCode="JO"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Saudi Arabia",
      code: "+966",
      shortcut: "SA",
      flag: (
        <ReactCountryFlag
          countryCode="SA"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "UAE",
      code: "+971",
      shortcut: "AE",
      flag: (
        <ReactCountryFlag
          countryCode="AE"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Qatar",
      code: "+974",
      shortcut: "QA",
      flag: (
        <ReactCountryFlag
          countryCode="QA"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Kuwait",
      code: "+965",
      shortcut: "KW",
      flag: (
        <ReactCountryFlag
          countryCode="KW"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "USA",
      code: "+1",
      shortcut: "US",
      flag: (
        <ReactCountryFlag
          countryCode="US"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "UK",
      code: "+44",
      shortcut: "GB",
      flag: (
        <ReactCountryFlag
          countryCode="GB"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Australia",
      code: "+61",
      shortcut: "AU",
      flag: (
        <ReactCountryFlag
          countryCode="AU"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Germany",
      code: "+49",
      shortcut: "DE",
      flag: (
        <ReactCountryFlag
          countryCode="DE"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "France",
      code: "+33",
      shortcut: "FR",
      flag: (
        <ReactCountryFlag
          countryCode="FR"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Italy",
      code: "+39",
      shortcut: "IT",
      flag: (
        <ReactCountryFlag
          countryCode="IT"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Spain",
      code: "+34",
      shortcut: "ES",
      flag: (
        <ReactCountryFlag
          countryCode="ES"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Netherlands",
      code: "+31",
      shortcut: "NL",
      flag: (
        <ReactCountryFlag
          countryCode="NL"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Sweden",
      code: "+46",
      shortcut: "SE",
      flag: (
        <ReactCountryFlag
          countryCode="SE"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Norway",
      code: "+47",
      shortcut: "NO",
      flag: (
        <ReactCountryFlag
          countryCode="NO"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Denmark",
      code: "+45",
      shortcut: "DK",
      flag: (
        <ReactCountryFlag
          countryCode="DK"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Finland",
      code: "+358",
      shortcut: "FI",
      flag: (
        <ReactCountryFlag
          countryCode="FI"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Brazil",
      code: "+55",
      shortcut: "BR",
      flag: (
        <ReactCountryFlag
          countryCode="BR"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Mexico",
      code: "+52",
      shortcut: "MX",
      flag: (
        <ReactCountryFlag
          countryCode="MX"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Argentina",
      code: "+54",
      shortcut: "AR",
      flag: (
        <ReactCountryFlag
          countryCode="AR"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "South Africa",
      code: "+27",
      shortcut: "ZA",
      flag: (
        <ReactCountryFlag
          countryCode="ZA"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "India",
      code: "+91",
      shortcut: "IN",
      flag: (
        <ReactCountryFlag
          countryCode="IN"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "China",
      code: "+86",
      shortcut: "CN",
      flag: (
        <ReactCountryFlag
          countryCode="CN"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Japan",
      code: "+81",
      shortcut: "JP",
      flag: (
        <ReactCountryFlag
          countryCode="JP"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "South Korea",
      code: "+82",
      shortcut: "KR",
      flag: (
        <ReactCountryFlag
          countryCode="KR"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Singapore",
      code: "+65",
      shortcut: "SG",
      flag: (
        <ReactCountryFlag
          countryCode="SG"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "New Zealand",
      code: "+64",
      shortcut: "NZ",
      flag: (
        <ReactCountryFlag
          countryCode="NZ"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Russia",
      code: "+7",
      shortcut: "RU",
      flag: (
        <ReactCountryFlag
          countryCode="RU"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Turkey",
      code: "+90",
      shortcut: "TR",
      flag: (
        <ReactCountryFlag
          countryCode="TR"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Egypt",
      code: "+20",
      shortcut: "EG",
      flag: (
        <ReactCountryFlag
          countryCode="EG"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Morocco",
      code: "+212",
      shortcut: "MA",
      flag: (
        <ReactCountryFlag
          countryCode="MA"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Nigeria",
      code: "+234",
      shortcut: "NG",
      flag: (
        <ReactCountryFlag
          countryCode="NG"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Kenya",
      code: "+254",
      shortcut: "KE",
      flag: (
        <ReactCountryFlag
          countryCode="KE"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Pakistan",
      code: "+92",
      shortcut: "PK",
      flag: (
        <ReactCountryFlag
          countryCode="PK"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Bangladesh",
      code: "+880",
      shortcut: "BD",
      flag: (
        <ReactCountryFlag
          countryCode="BD"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Thailand",
      code: "+66",
      shortcut: "TH",
      flag: (
        <ReactCountryFlag
          countryCode="TH"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Vietnam",
      code: "+84",
      shortcut: "VN",
      flag: (
        <ReactCountryFlag
          countryCode="VN"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Philippines",
      code: "+63",
      shortcut: "PH",
      flag: (
        <ReactCountryFlag
          countryCode="PH"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      name: "Malaysia",
      code: "+60",
      shortcut: "MY",
      flag: (
        <ReactCountryFlag
          countryCode="MY"
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
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
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const savedData = localStorage.getItem("signupFormData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        if (parsed.password) {
          setPasswordStrength(checkPasswordStrength(parsed.password));
        }
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("signupFormData", JSON.stringify(formData));
  }, [formData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isDropdownOpen]);

  // Filter countries based on search
  const filteredCountries = countryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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

      const response = await axios.post(`${API_URL}/auth/signup`, payload);

      if (response.status === 201) {
        localStorage.removeItem("signupFormData");
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
              returnTo: location.state?.returnTo,
            },
          });
        } else if (response.data.token) {
          login(response.data.token, response.data.user);
          const returnTo = location.state?.returnTo;
          navigate(returnTo || "/");
        }
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "An error occurred during signup";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setFormData((prev) => ({
      ...prev,
      phone: country.code + " ",
    }));
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const inputClasses =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40";

  return (
    <div className="min-h-screen bg-brand-light">
      <section className="section-shell pt-8 pb-20 flex justify-center items-start">
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

          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              {error}
            </div>
          )}

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
                placeholder="First Name"
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
                placeholder="Second Name"
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
                placeholder="Last Name"
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
                {/* Custom Country Code Selector */}
                <div className="w-40 flex-shrink-0 relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full h-[46px] px-4 py-3 bg-white border border-gray-300 rounded-xl hover:border-brand-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <span className="font-semibold text-sm text-gray-700">
                        {selectedCountry.code}
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border-2 border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Search Box */}
                      <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                        <div className="relative">
                          <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search country..."
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                          />
                        </div>
                      </div>

                      {/* Countries List */}
                      <div className="max-h-64 overflow-y-auto py-1">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-purple-500/5 transition-all duration-150 ${
                                selectedCountry.code === country.code
                                  ? "bg-gradient-to-r from-brand-primary/10 to-purple-500/10"
                                  : ""
                              }`}
                            >
                              <span className="text-2xl">{country.flag}</span>
                              <div className="flex-1 text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm text-gray-700">
                                    {country.code}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {country.name}
                                  </span>
                                </div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center">
                            <p className="text-sm text-gray-500">
                              No countries found
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <input
                  type="tel"
                  name="phone"
                  placeholder="+962 7X XXX XXXX"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${inputClasses} flex-1`}
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClasses} w-full pr-10 h-12`}
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
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${inputClasses} w-full pr-10 h-12`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} className="text-gray-500" />
                  ) : (
                    <Eye size={20} className="text-gray-500" />
                  )}
                </button>
              </div>
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
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-brand-primary underline cursor-pointer hover:text-brand-primary/80"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => setShowPrivacyPolicyModal(true)}
                  className="text-brand-primary underline cursor-pointer hover:text-brand-primary/80"
                >
                  Privacy Policy
                </button>
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
                state={{ returnTo: location.state?.returnTo }}
                className="text-brand-primary font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </section>
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
      <PrivacyPolicyModal
        isOpen={showPrivacyPolicyModal}
        onClose={() => setShowPrivacyPolicyModal(false)}
      />
    </div>
  );
};

export default SignUp;
