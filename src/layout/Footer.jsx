import React from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Globe,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0c0f1d] text-[#c9c9d9] py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-3xl font-extrabold text-white">
            <span style={{ color: "#f2a91d", fontWeight: "900" }}>Dot</span>
            LinkMe
          </h3>
          <p className="text-sm text-[#9ea0b5] leading-relaxed">
            Smart NFC-powered identity. Share your profile with a single tap.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 pt-4">
            <a
              className="hover:text-brand-primary transition"
              href="https://www.facebook.com/khaled.abu.yousef.260261"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe size={18} />
            </a>
            <a
              className="hover:text-brand-primary transition"
              href="https://www.instagram.com/khaledalawartany?igsh=MTBmeXlqOTV2bGx5OA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={18} />
            </a>
            <a
              className="hover:text-brand-primary transition"
              href="https://x.com/khaled_awartany"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={18} />
            </a>
            <a
              className="hover:text-brand-primary transition"
              href="https://www.linkedin.com/in/khaled-awartany-9660b9280"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="md:pt-0 pt-10">
          <h4 className="text-white font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm text-[#a1a3b8]">
            <li>
              <Link to="/" className="hover:text-brand-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/create-card"
                className="hover:text-brand-primary transition"
              >
                Create Card
              </Link>
            </li>
            <li>
              <Link
                to="/how-it-works"
                className="hover:text-brand-primary transition"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand-primary transition">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-brand-primary transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:pt-0 pt-10">
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-[#a1a3b8]">
            <li>
              <Phone size={16} className="inline mr-2 text-brand-primary" />
              +962789924535
            </li>
            <li>
              <Mail size={16} className="inline mr-2 text-brand-primary" />
              info@dotmediajo.net
            </li>
            <li>
              <MapPin size={16} className="inline mr-2 text-brand-primary" />
              Jordan-Amman Wasfi Al Tal Street
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 pt-6 border-t border-[#1d2133] text-center text-xs text-[#7e8093]">
        © {new Date().getFullYear()} LinkMe. All rights reserved.
      </div>
    </footer>
  );
}
