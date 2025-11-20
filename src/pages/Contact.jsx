import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Globe,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  HeadphonesIcon,
  Zap,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:4000/api/create/contact-messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log("Message sent successfully:", data);

      // Optional: reset the form
      setFormData({ name: "", email: "", message: "" });

      // Optional: show a success alert
      alert("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-brand-gradient to-brand-dark text-white py-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-700"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">We're Here to Help</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Touch
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Have a question or want to learn more? We'd love to hear from you.
            Our team is ready to help you get started.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-brand-light">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Contact Card */}
              <div className="bg-brand-gradient text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Email Us</p>
                      <a
                        href="mailto:hello@smartcard.com"
                        className="font-semibold hover:underline"
                      >
                        hello@smartcard.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Call Us</p>
                      <a
                        href="tel:+1234567890"
                        className="font-semibold hover:underline"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Visit Us</p>
                      <p className="font-semibold">
                        123 Innovation Street
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-brand-accent/10 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-brand-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-brand-primary font-semibold">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">Saturday</span>
                    <span className="text-brand-primary font-semibold">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-400 font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-brand-dark mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-brand-dark mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-primary focus:outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-brand-dark mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-primary focus:outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-brand-dark mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-primary focus:outline-none transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="group w-full bg-gradient-to-r from-brand-primary to-blue-600 hover:from-blue-600 hover:to-brand-primary text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold text-sm uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full inline-block mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              We're Here to{" "}
              <span className="text-brand-primary">Support You</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated team is committed to providing exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl hover:bg-brand-light transition-all">
              <div className="bg-gradient-to-br from-brand-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                Fast Response
              </h3>
              <p className="text-gray-600">
                Get replies within 24 hours on business days. We value your time
                and ensure prompt communication.
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-brand-light transition-all">
              <div className="bg-gradient-to-br from-brand-accent to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <HeadphonesIcon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                Expert Support
              </h3>
              <p className="text-gray-600">
                Our knowledgeable team is ready to help with any questions about
                our products and services.
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-brand-light transition-all">
              <div className="bg-gradient-to-br from-brand-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Globe className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                Global Reach
              </h3>
              <p className="text-gray-600">
                Operating in 120+ countries, we're equipped to handle
                international inquiries and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-xl h-96 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10"></div>
            <div className="relative z-10 text-center">
              <MapPin className="w-16 h-16 text-brand-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                Visit Our Office
              </h3>
              <p className="text-gray-600 mb-4">
                123 Innovation Street, San Francisco, CA 94105
              </p>
              <button className="bg-brand-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all inline-flex items-center gap-2">
                <MapPin size={18} />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-brand-dark mb-2">
                Trusted by 50,000+
              </h4>
              <p className="text-gray-600 text-sm">Active users worldwide</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-brand-primary" />
              </div>
              <h4 className="font-bold text-brand-dark mb-2">
                99% Satisfaction Rate
              </h4>
              <p className="text-gray-600 text-sm">Customer approval rating</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-brand-accent" />
              </div>
              <h4 className="font-bold text-brand-dark mb-2">24/7 Support</h4>
              <p className="text-gray-600 text-sm">Always here to help you</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
