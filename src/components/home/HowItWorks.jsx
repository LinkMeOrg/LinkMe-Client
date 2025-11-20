import React from "react";
import { Smartphone, UserPlus, Share2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone size={40} className="text-brand-primary" />,
      title: "Choose Your Card",
      text: "Pick your NFC card design and activate your Dot LinkMe account.",
    },
    {
      icon: <UserPlus size={40} className="text-brand-primary" />,
      title: "Create Your Profile",
      text: "Add your name, bio, photo, and all your social links in minutes.",
    },
    {
      icon: <Share2 size={40} className="text-brand-primary" />,
      title: "Tap & Share",
      text: "Share your identity instantly using NFC, QR, or your smart link.",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-[#f4f6ff]  ">
      {/* Faded background title */}
      <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-[90px] font-extrabold text-[#f2a91d]/20 tracking-widest select-none">
        HOW IT WORKS
      </h1>

      <div className="section-shell grid md:grid-cols-2 items-center gap-16 relative z-10">
        {/* ---------- Left: Phone Mockup ---------- */}
        <div data-aos="fade-right" className="flex justify-center">
          <div className="relative">
            {/* phone mockup */}
            <div className="w-96 h-[680px]">
              <img
                src="images/phone.png"
                alt="mockup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ---------- Right: Steps ---------- */}
        <div data-aos="fade-left" className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold">
            How{" "}
            <span className="text-brand-primary font-bold">
              <span style={{ color: "#f2a91d", fontWeight: "900" }}>Dot</span>{" "}
              LinkMe
            </span>{" "}
            Works
          </h2>

          <p className="text-gray-600  max-w-md">
            Turn your physical card into a powerful digital identity in seconds.
          </p>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl bg-white  shadow-md border border-gray-100  hover:shadow-xl transition-all duration-300"
              >
                <div className="mt-1">{step.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-gray-600  text-sm">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
