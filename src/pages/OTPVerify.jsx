import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { Loader2 } from "lucide-react";

const OTPVerify = () => {
  const { state } = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [countdownActive, setCountdownActive] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const email = state?.email;
  const returnTo = state?.returnTo;

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email not found. Please sign up again.",
      }).then(() => navigate("/signup"));
    }
  }, [email, navigate]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (countdownActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCountdownActive(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, countdownActive]);

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

    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    setTimeout(() => {
      if (inputRefs.current[lastFilledIndex + 1]) {
        inputRefs.current[lastFilledIndex + 1].focus();
      } else {
        inputRefs.current[5].focus();
      }
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits of the OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email,
        otp: otpString,
      });

      if (response.status === 200) {
        const { token, refreshToken, user } = response.data;

        login(token, refreshToken, user);

        Swal.fire({
          icon: "success",
          title: "OTP Verified!",
          text: "Your OTP has been verified successfully.",
          confirmButtonText: "OK",
        }).then(() => {
          if (returnTo) {
            navigate(returnTo);
          } else {
            navigate("/");
          }
        });
      } else {
        setError(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/auth/resend-otp`, {
        email,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "OTP Resent!",
          text: "A new OTP has been sent to your email.",
        });
        setCountdown(60);
        setCountdownActive(true);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        setError(response.data.message || "Error resending OTP");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <section className="section-shell pt-28 pb-20 flex justify-center items-start">
        <div
          data-aos="fade-up"
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 md:p-10"
        >
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide">
              Email Verification
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mt-1">
              Verify Your Account
            </h1>
            <p className="text-gray-600 mt-3 text-sm">
              We've sent a 6-digit OTP to
              <span className="font-medium text-brand-primary ml-1 block sm:inline">
                {email}
              </span>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-3 text-center"
              >
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary-clean py-3 text-base rounded-xl shadow-md transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-3" size={20} />
                  Verifying...
                </span>
              ) : (
                "Verify Account"
              )}
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOtp}
              disabled={resendLoading || countdownActive}
              className={`text-brand-primary hover:underline font-medium text-sm ${
                countdownActive || resendLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {resendLoading
                ? "Resending..."
                : countdownActive
                ? `Resend OTP in ${countdown}s`
                : "Resend OTP"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OTPVerify;
