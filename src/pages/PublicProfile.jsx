import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ProfileCardDesktop from "../components/PublicProfile/ProfileCardDesktop";
import ProfileCardMobile from "../components/PublicProfile/ProfileCardMobile";
import ShareModal from "../components/PublicProfile/Modals";
import QRModal from "../components/PublicProfile/QRModal";
import NotFound from "./NotFound";
import { Loader2, AlertTriangle } from "lucide-react";

export default function PublicProfile() {
  const { slug } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [slug]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `https://linkme-api.onrender.com/api/profiles/public/${slug}`
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
      await fetch(
        `https://linkme-api.onrender.com/api/analytics/track-view/${slug}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: "link" }),
        }
      );
    } catch (err) {
      console.error("Error tracking view:", err);
    }
  };

  const handleSocialClick = async (linkId, url) => {
    // Ensure URL has proper protocol
    const fullUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    // Track click first (don't await)
    fetch(`https://linkme-api.onrender.com/api/social-links/${linkId}/click`, {
      method: "POST",
    }).catch((err) => console.error("Error tracking click:", err));

    // Use location.href for better mobile compatibility
    window.location.href = fullUrl;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return <NotFound />;
  }

  const phoneLink = profile.socialLinks?.find((l) => l.platform === "phone");
  const emailLink = profile.socialLinks?.find((l) => l.platform === "email");
  const whatsappLink = profile.socialLinks?.find(
    (l) => l.platform === "whatsapp"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Desktop View (hidden on mobile) */}
      <div className="hidden lg:block">
        <ProfileCardDesktop
          profile={profile}
          phoneLink={phoneLink}
          emailLink={emailLink}
          whatsappLink={whatsappLink}
          handleCall={handleCall}
          handleEmail={handleEmail}
          handleWhatsApp={handleWhatsApp}
          handleDownloadVCard={handleDownloadVCard}
          handleSocialClick={handleSocialClick}
          setShowShareModal={setShowShareModal}
          setShowQRModal={setShowQRModal}
        />
      </div>

      {/* Mobile View (hidden on desktop) */}
      <div className="lg:hidden">
        <ProfileCardMobile
          profile={profile}
          phoneLink={phoneLink}
          emailLink={emailLink}
          whatsappLink={whatsappLink}
          handleCall={handleCall}
          handleEmail={handleEmail}
          handleWhatsApp={handleWhatsApp}
          handleDownloadVCard={handleDownloadVCard}
          handleSocialClick={handleSocialClick}
          setShowShareModal={setShowShareModal}
          setShowQRModal={setShowQRModal}
        />
      </div>

      {/* Modals */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={handleShare}
      />

      <QRModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        profile={profile}
        onDownload={handleDownloadQR}
      />
    </div>
  );
}
