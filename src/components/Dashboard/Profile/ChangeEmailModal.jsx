import React, { useState, useRef, useEffect } from "react";
import { X, Mail, Lock, Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ChangeEmailModal({
  isOpen,
  onClose,
  currentEmail,
  onEmailChanged,
}) {
  const [step, setStep] = useState(1); // 1: Request, 2: Verify OTP
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    newEmail: "",
    password: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const inputRefs = useRef([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (step === 2 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [step]);

  const handleClose = () => {
    setStep(1);
    setFormData({ newEmail: "", password: "" });
    setOtp(["", "", "", "", "", ""]);
    setErrors({});
    setShowPassword(false);
    onClose();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Allow only digits
    if (!/^\d+$/.test(pastedData)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Format",
        text: "Please paste only numeric digits",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const newOtp = ["", "", "", "", "", ""];
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus on last filled input or last input
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    setTimeout(() => {
      if (inputRefs.current[lastFilledIndex + 1]) {
        inputRefs.current[lastFilledIndex + 1].focus();
      } else {
        inputRefs.current[5].focus();
      }
    }, 0);
  };

  const handleRequestChange = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!formData.newEmail.trim()) {
      setErrors({ newEmail: "New email is required" });
      return;
    }

    if (!validateEmail(formData.newEmail)) {
      setErrors({ newEmail: "Invalid email format" });
      return;
    }

    if (formData.newEmail.toLowerCase() === currentEmail.toLowerCase()) {
      setErrors({ newEmail: "New email is same as current email" });
      return;
    }

    if (!formData.password) {
      setErrors({ password: "Password is required" });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/me/request-email-change`,
        {
          newEmail: formData.newEmail.trim(),
          password: formData.password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        icon: "success",
        title: "OTP Sent!",
        text: response.data.message,
        confirmButtonColor: "#3b82f6",
      });

      setStep(2);
    } catch (error) {
      console.error("Error requesting email change:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to send OTP";
      setErrors({ submit: errorMessage });

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setErrors({});

    const otpString = otp.join("");
    if (!otpString.trim()) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    if (otpString.trim().length !== 6) {
      setErrors({ otp: "OTP must be 6 digits" });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/me/verify-email-change`,
        {
          otp: otpString.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Email Updated!",
        text: response.data.message,
        confirmButtonColor: "#3b82f6",
      });

      // Notify parent component
      if (onEmailChanged) {
        onEmailChanged(response.data.user);
      }

      handleClose();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const errorMessage = error.response?.data?.message || "Invalid OTP";
      setErrors({ otp: errorMessage });

      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: errorMessage,
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/me/cancel-email-change`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error cancelling email change:", error);
    }
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-primary to-blue-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Change Email Address
            </h2>
            <p className="text-blue-100 text-sm mt-1">Step {step} of 2</p>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            // Step 1: Request Email Change
            <form onSubmit={handleRequestChange} className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-medium">Current Email:</p>
                <p className="text-blue-600">{currentEmail}</p>
              </div>

              {/* New Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.newEmail}
                    onChange={(e) => {
                      setFormData({ ...formData, newEmail: e.target.value });
                      setErrors({ ...errors, newEmail: "" });
                    }}
                    placeholder="your.new.email@example.com"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.newEmail
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-gray-300 focus:ring-brand-primary/50"
                    }`}
                  />
                </div>
                {errors.newEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.newEmail}</p>
                )}
              </div>

              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setErrors({ ...errors, password: "" });
                    }}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-gray-300 focus:ring-brand-primary/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  We need to verify your identity before changing your email
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-xl font-medium hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>Send OTP</>
                  )}
                </button>
              </div>
            </form>
          ) : (
            // Step 2: Verify OTP
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Verify Your Email
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  We've sent a 6-digit code to:
                </p>
                <p className="text-brand-primary font-medium">
                  {formData.newEmail}
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                  Enter verification code
                </label>
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary shadow-sm bg-gray-50 transition-all"
                      aria-label={`Digit ${index + 1}`}
                    />
                  ))}
                </div>

                {errors.otp && (
                  <p className="text-red-500 text-sm mt-3 text-center">
                    {errors.otp}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Code expires in 10 minutes
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-xl font-medium hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Verify & Update
                    </>
                  )}
                </button>
              </div>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp(["", "", "", "", "", ""]);
                  }}
                  className="text-sm text-brand-primary hover:underline"
                >
                  Didn't receive code? Try again
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
