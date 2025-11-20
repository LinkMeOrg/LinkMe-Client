import React from "react";
import { ShieldCheck, Zap, Brush, BarChart3 } from "lucide-react";

const WhyChoose = () => {
  const features = [
    {
      icon: <Zap size={30} className="text-brand-primary" />,
      title: "Fast & Instant Sharing",
      text: "Share your digital identity instantly through NFC, QR, or smart links.",
    },
    {
      icon: <Brush size={30} className="text-brand-primary" />,
      title: "Fully Customizable",
      text: "Control your image, bio, links, and style to reflect who you truly are.",
    },
    {
      icon: <ShieldCheck size={30} className="text-brand-primary" />,
      title: "Secure Identity",
      text: "Your data stays protected with enterprise-grade security protocols.",
    },
    {
      icon: <BarChart3 size={30} className="text-brand-primary" />,
      title: "Smart Analytics",
      text: "Track visits, clicks, and interactions in real-time.",
    },
  ];
  return (
    <section className="py-24 bg-white  text-brand-dark ">
      <div className="section-shell grid md:grid-cols-2 gap-16 items-center">
        {/* -------- LEFT SIDE CONTENT -------- */}
        <div data-aos="fade-right" className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Why Choose{" "}
            <span className="text-brand-primary font-bold">
              <span style={{ color: "#f2a91d", fontWeight: "900" }}>Dot</span>{" "}
              LinkMe?
            </span>
          </h2>

          <p className="text-gray-600  max-w-md">
            A modern, smart, and secure way to share your digital identity.
            Designed to elevate your presence and put you ahead of the game.
          </p>

          {/* Feature Boxes */}
          <div className="grid sm:grid-cols-2 gap-5 pt-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white  border border-gray-200  shadow-md 
                transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-float"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600 ">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* -------- RIGHT SIDE IMAGE + BG TEXT -------- */}
        <div
          data-aos="fade-left"
          className="relative flex justify-center items-center overflow-hidden"
          style={{ minHeight: "420px" }}
        >
          {/* IMAGE */}
          <img
            src="/images/man.png"
            alt="Professional Person"
            className="relative z-10 
              w-[340px] md:w-[480px] lg:w-[550px]
              object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
