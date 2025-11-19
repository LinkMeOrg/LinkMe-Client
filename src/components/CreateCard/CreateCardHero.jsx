// src/components/CreateCard/CreateCardHero.jsx
import React from "react";

const STEPS = [
  {
    number: 1,
    title: "Choose profile type",
    description: "Personal or business – or both.",
  },
  {
    number: 2,
    title: "Add your details",
    description: "Name, title, links & branding.",
  },
  {
    number: 3,
    title: "Generate card & QR",
    description: "Share it, or print on NFC card.",
  },
];

export default function CreateCardHero() {
  return (
    <section className="section-shell pt-28 pb-10">
      <div
        className="flex flex-col lg:flex-row gap-10 items-center"
        data-aos="fade-up"
      >
        <div className="space-y-4">
          <p className="text-sm font-medium text-brand-primary uppercase tracking-wide">
            Create Card
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark leading-tight">
            Build Your{" "}
            <span className="text-brand-primary">Smart Identity</span> in
            seconds.
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-xl">
            Design a personal or business NFC card, add your links, and get your
            unique smart link & QR code instantly. Perfect for events,
            networking, and everyday sharing.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="card-glass px-4 py-3 flex items-center gap-3"
              >
                <div className="floating-icon text-brand-primary bg-brand-primary/5">
                  {step.number}
                </div>
                <div>
                  <p className="font-semibold text-sm text-brand-dark">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="card-glass p-6 md:p-7 lg:p-8"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <h3 className="text-lg font-semibold text-brand-dark mb-2">
            One link. One tap. One identity.
          </h3>
          <p className="text-sm text-gray-600 mb-4">Your card will generate:</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Unique smart link (for your NFC & QR)</li>
            <li>• Digital profile page that matches LinkMe brand</li>
            <li>• QR code ready for printing or sharing</li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            You can edit your information later from your dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}
