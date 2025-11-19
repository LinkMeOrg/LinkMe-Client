import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function PublicProfile() {
  const { slug } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/profiles/public/${slug}`
        );

        if (!response.ok) {
          throw new Error("Profile not found");
        }

        const data = await response.json();
        setProfile(data.data);

        await trackView();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const trackView = async () => {
      try {
        await fetch(`http://localhost:4000/api/analytics/track-view/${slug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: "link",
          }),
        });
      } catch (err) {
        console.error("Error tracking view:", err);
      }
    };

    fetchProfile();
  }, [slug]);

  const handleSocialClick = async (linkId) => {
    try {
      await fetch(`http://localhost:4000/api/social-links/${linkId}/click`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Error tracking click:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600">Profile not found</p>
        </div>
      </div>
    );
  }

  const getTemplateClass = () => {
    const templates = {
      gradient:
        "bg-gradient-to-br from-brand-primary/90 via-[#0B0F19] to-[#16203A]",
      glass: "bg-white/80 backdrop-blur-lg",
      dark: "bg-brand-dark",
      modern: "bg-brand-primary",
    };
    return templates[profile.template] || templates.modern;
  };

  return (
    <div className="min-h-screen bg-brand-light py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div
          className={`${getTemplateClass()} rounded-3xl shadow-2xl overflow-hidden text-white`}
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className={`w-32 h-32 object-cover border-4 border-white/80 shadow-lg ${
                      profile.profileType === "personal"
                        ? "rounded-full"
                        : "rounded-2xl"
                    }`}
                  />
                ) : (
                  <div
                    className={`w-32 h-32 flex items-center justify-center text-5xl bg-white/20 border-4 border-white/40 ${
                      profile.profileType === "personal"
                        ? "rounded-full"
                        : "rounded-2xl"
                    }`}
                  >
                    {profile.profileType === "personal" ? "👤" : "🏢"}
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {profile.name}
                </h1>
                {profile.title && (
                  <p className="text-lg md:text-xl opacity-90 mb-3">
                    {profile.title}
                  </p>
                )}
                {profile.bio && (
                  <p className="text-sm md:text-base opacity-80 max-w-2xl">
                    {profile.bio}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-medium">
                    {profile.profileType === "personal"
                      ? "Personal"
                      : "Business"}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-medium">
                    {profile.viewCount || 0} views
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <QRCodeCanvas value={profile.profileUrl} size={120} />
                  <p className="text-center text-xs text-gray-600 mt-2">
                    Scan to save
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {profile.socialLinks && profile.socialLinks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-4 text-center">
              Connect with me
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(link.id)}
                  className="card-glass p-4 flex items-center gap-4 hover:shadow-lg transition-all group"
                >
                  <div className="text-3xl">
                    {getPlatformIcon(link.platform)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {link.label || formatPlatformName(link.platform)}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{link.url}</p>
                  </div>
                  <div className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Powered by{" "}
            <a
              href="/"
              className="text-brand-primary font-semibold hover:underline"
            >
              Dot LinkMe
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function getPlatformIcon(platform) {
  const icons = {
    website: "🌐",
    linkedin: "💼",
    instagram: "📸",
    twitter: "🐦",
    github: "💻",
    whatsapp: "💬",
    email: "📧",
    phone: "📱",
  };
  return icons[platform] || "🔗";
}

function formatPlatformName(platform) {
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}
