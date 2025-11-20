import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Modals from "../components/PublicProfile/Modals";
import ProfileCardWrapper from "../components/PublicProfile/ProfileCardWrapper";
import Swal from "sweetalert2";

export default function PublicProfile() {
  const { slug } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [slug]);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "link" }),
      });
    } catch (err) {
      console.error("Error tracking view:", err);
    }
  };

  const handleSocialClick = async (linkId, url) => {
    try {
      await fetch(`http://localhost:4000/api/social-links/${linkId}/click`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Error tracking click:", err);
    }
    window.open(url, "_blank");
  };

  const handleShare = async (method) => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${profile.name}'s profile`;

    if (method === "native" && navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else if (method === "copy") {
      navigator.clipboard.writeText(shareUrl);
      Swal.fire({
        icon: "success",
        title: "Link copied to clipboard!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (method === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`
      );
    } else if (method === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`
      );
    } else if (method === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`
      );
    } else if (method === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`
      );
    }

    setShowShareModal(false);
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById("profile-qr");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${profile.slug}-qr-code.png`;
    link.href = url;
    link.click();
  };

  const handleDownloadVCard = () => {
    const phoneLink = profile.socialLinks?.find((l) => l.platform === "phone");
    const emailLink = profile.socialLinks?.find((l) => l.platform === "email");
    const websiteLink = profile.socialLinks?.find(
      (l) => l.platform === "website"
    );

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
${profile.title ? `TITLE:${profile.title}` : ""}
${emailLink ? `EMAIL:${emailLink.url}` : ""}
${phoneLink ? `TEL:${phoneLink.url}` : ""}
${websiteLink ? `URL:${websiteLink.url}` : ""}
${profile.bio ? `NOTE:${profile.bio}` : ""}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile.name}.vcf`;
    link.click();
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleWhatsApp = (number) => {
    const cleanNumber = number.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanNumber}`);
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      /* --- all icons unchanged, paste them as is from original code --- */
    };
    return (
      icons[platform] || (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        {/* loading UI stays the same */}
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        {/* error UI stays the same */}
      </div>
    );
  }

  const phoneLink = profile.socialLinks?.find((l) => l.platform === "phone");
  const emailLink = profile.socialLinks?.find((l) => l.platform === "email");
  const whatsappLink = profile.socialLinks?.find(
    (l) => l.platform === "whatsapp"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-4">
      <div className="max-w-md mx-auto">
        <ProfileCardWrapper
          profile={profile}
          phoneLink={phoneLink}
          emailLink={emailLink}
          whatsappLink={whatsappLink}
          handleCall={handleCall}
          handleEmail={handleEmail}
          handleWhatsApp={handleWhatsApp}
          handleDownloadVCard={handleDownloadVCard}
          handleSocialClick={handleSocialClick}
          getPlatformIcon={getPlatformIcon}
          setShowShareModal={setShowShareModal}
          setShowQRModal={setShowQRModal}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />

        {/* POWERED BY */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            Powered by
            <a
              href="/"
              className="text-blue-400 font-semibold hover:text-blue-300"
            >
              Dot LinkMe
            </a>
          </p>
        </div>
      </div>

      {/* MODALS */}
      <Modals
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        handleShare={handleShare}
        showQRModal={showQRModal}
        setShowQRModal={setShowQRModal}
        profile={profile}
        handleDownloadQR={handleDownloadQR}
      />
    </div>
  );
}
