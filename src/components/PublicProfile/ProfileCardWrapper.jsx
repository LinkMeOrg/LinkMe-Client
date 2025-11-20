import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

export default function ProfileCardWrapper({
  profile,
  phoneLink,
  emailLink,
  whatsappLink,
  handleCall,
  handleEmail,
  handleWhatsApp,
  handleDownloadVCard,
  handleSocialClick,
  getPlatformIcon,
  setShowShareModal,
  setShowQRModal,
  isFlipped,
  setIsFlipped,
}) {
  return (
    <div className="relative w-full" style={{ perspective: "1000px" }}>
      {/* MAIN FLIP CONTAINER */}
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="w-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl shadow-2xl overflow-hidden relative min-h-[540px]">
            <ProfileHeader
              profile={profile}
              phoneLink={phoneLink}
              emailLink={emailLink}
              whatsappLink={whatsappLink}
              handleCall={handleCall}
              handleEmail={handleEmail}
              handleWhatsApp={handleWhatsApp}
              handleDownloadVCard={handleDownloadVCard}
              setShowShareModal={setShowShareModal}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
            />
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl shadow-2xl overflow-hidden relative">
            <ProfileContent
              profile={profile}
              handleSocialClick={handleSocialClick}
              getPlatformIcon={getPlatformIcon}
              setShowQRModal={setShowQRModal}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
