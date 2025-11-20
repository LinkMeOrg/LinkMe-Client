import React from "react";
import { Link } from "react-router-dom";

import {
  UserPlus,
  CreditCard,
  Smartphone,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Share2,
  BarChart3,
  Users,
  Wifi,
} from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-brand-gradient text-white py-24 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
          <div className="absolute w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-700" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Simple & Powerful</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Works
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Create your profile, tap your card, and share your world in seconds.
          </p>

          <Link
            to="/create-card"
            className="inline-flex items-center justify-center gap-2
             bg-brand-accent hover:bg-red-600 text-white
             px-8 py-4 rounded-xl font-semibold
             mx-auto transition-all transform hover:scale-105
             shadow-lg hover:shadow-2xl"
          >
            <span>Get Started Now</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>

      {/* =============== BLUE VIDEO SECTION =============== */}
      <section className="relative py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Watch How Your NFC Card{" "}
            <span className="text-brand-accent">Works</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            A quick demo showing how one tap opens your profile instantly.
          </p>

          {/* Blue Video Card */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-blue-200 mx-auto bg-gradient-to-br from-blue-500 to-blue-900">
            {/* Header Badges */}
            <div className="absolute top-4 left-4 bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
              Live Demo • Smart NFC Card
            </div>

            <div className="absolute top-4 right-4 bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-1">
              <span className="text-white/80">➤</span> NFC Enabled
            </div>

            {/* VIDEO AREA */}
            <div className="relative w-full h-[420px] flex items-center justify-center">
              {/* Blue Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-900 opacity-80"></div>

              {/* Play Button */}
              <button className="relative z-10 bg-white/30 backdrop-blur-md w-24 h-24 rounded-full flex items-center justify-center hover:bg-white/40 transition shadow-xl border border-white/20 cursor-pointer">
                <div className="w-0 h-0 border-t-[18px] border-t-transparent border-l-[32px] border-l-white border-b-[18px] border-b-transparent ml-1"></div>
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Replace with your real video source.
          </p>
        </div>
      </section>

      {/* ================= 3 STEPS (SHORT & CLEAN) ================= */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-brand-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-primary font-semibold text-sm uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full inline-block mb-4">
              In 3 Simple Steps
            </span>
            <h2 className="text-4xl font-bold text-brand-dark mb-3">
              From Card to Connection
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Set up once. Then share with a single tap everywhere you go.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-brand-primary to-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-md">
                  1
                </div>
                <UserPlus className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark mb-2">
                Create your profile
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Add your name, photo, role, and main links in a few clicks.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Personal & business
                </span>
                <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Custom branding
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-brand-accent to-red-500 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-md">
                  2
                </div>
                <CreditCard className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark mb-2">
                Link your NFC card
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Choose a design, connect it to your profile, and we print it.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Premium PVC
                </span>
                <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                  <Zap className="w-3 h-3 text-brand-accent" />
                  Fast delivery
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-brand-primary to-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-md">
                  3
                </div>
                <Smartphone className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark mb-2">
                Tap & share
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                One tap on any NFC phone opens your profile instantly.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  No app needed
                </span>
                <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  iOS & Android
                </span>
              </div>
            </div>
          </div>

          {/* صغير خارج الصندوق: Before / After bar */}
          <div className="mt-10 max-w-3xl mx-auto grid md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white rounded-2xl border border-red-100 p-4 shadow-sm">
              <p className="text-[11px] font-semibold text-red-500 mb-1 uppercase tracking-wide">
                Before
              </p>
              <p className="text-gray-600">
                Paper cards, lost contacts, typing numbers and emails every
                time.
              </p>
            </div>
            <div className="bg-brand-primary/5 rounded-2xl border border-brand-primary/20 p-4 shadow-sm">
              <p className="text-[11px] font-semibold text-brand-primary mb-1 uppercase tracking-wide">
                After
              </p>
              <p className="text-gray-700">
                One smart card, live profile, and every connection saved in one
                place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS + CTA (COMBINED) ================= */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-primary font-semibold text-sm uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full inline-block mb-4">
              Why Professionals Love It
            </span>
            <h2 className="text-4xl font-bold text-brand-dark mb-3">
              More Than Just a Card
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Smart tools that help you share, follow up, and close more
              opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 text-sm">
            <div className="bg-brand-light rounded-2xl p-6 border border-gray-100">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Share2 className="text-brand-primary" size={22} />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">
                Instant Sharing
              </h3>
              <p className="text-gray-600">
                One tap replaces printing, typing, and stacks of paper cards.
              </p>
            </div>

            <div className="bg-brand-light rounded-2xl p-6 border border-gray-100">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <BarChart3 className="text-brand-primary" size={22} />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">
                Smart Analytics
              </h3>
              <p className="text-gray-600">
                See taps, views, and engagement so you know who is interested.
              </p>
            </div>

            <div className="bg-brand-light rounded-2xl p-6 border border-gray-100">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Users className="text-brand-primary" size={22} />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">
                Lead Capture
              </h3>
              <p className="text-gray-600">
                Save the people who tap your card and follow up in one place.
              </p>
            </div>
          </div>

          {/* CTA داخل نفس السكشن (مافي سكشن زيادة) */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">
              You&apos;re one tap away from smarter networking.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {/* زر الإنشاء -> يروح على صفحة Create Card */}
              <Link
                to="/create-card"
                className="group bg-brand-accent hover:bg-red-600 text-white
                   px-10 py-4 rounded-xl font-bold text-lg
                   transition-all transform hover:scale-105 shadow-xl
                   inline-flex items-center gap-2"
              >
                Get Started Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              {/* زر الأسعار */}
              <Link
                to="/pricing"
                className="group bg-blue-600 hover:bg-blue-700 text-white
             px-10 py-4 rounded-xl font-bold text-lg
             transition-all transform hover:scale-105 shadow-xl
             inline-flex items-center gap-2"
              >
                View Pricing
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* المميزات الخضراء تحت الأزرار */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Free account setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>No monthly fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Lifetime updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
