import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ProfileCardDesktop from "../components/PublicProfile/ProfileCardDesktop";
import ProfileCardMobile from "../components/PublicProfile/ProfileCardMobile";
import ShareModal from "../components/PublicProfile/Modals";
import NotFound from "./NotFound";
import VisitorContactModal from "../components/PublicProfile/VisitorContactModal";
import { Loader2, AlertTriangle } from "lucide-react";

export default function PublicProfile() {
  const { slug } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    fetchProfile();
  }, [slug]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/api/profiles/public/${slug}`);

      if (!response.ok) {
        throw new Error("Profile not found");
      }

      const data = await response.json();
      setProfile(data.data);
      await trackView();
      setTimeout(() => {
        setShowVisitorModal(true);
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    try {
      await fetch(`${API_URL}/api/analytics/track-view/${slug}`, {
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
      await fetch(`${API_URL}/api/social-links/${linkId}/click`, {
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
      <div className="min-h-screen bg-white flex items-center justify-center">
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
    <div className="min-h-screen bg-white">
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
        />
      </div>

      {/* Modals */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={handleShare}
      />

      <VisitorContactModal
        isOpen={showVisitorModal}
        onClose={() => setShowVisitorModal(false)}
        profileSlug={profile.slug}
        source="nfc"
      />
    </div>
  );
}