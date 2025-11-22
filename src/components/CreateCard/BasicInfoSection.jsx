import React from "react";
import FormField from "./FormField";
import ImageUpload from "./ImageUpload";

export default function BasicInfoSection({
  profileType,
  currentProfile,
  updateProfile,
}) {
  const isPersonal = profileType === "personal";

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    updateProfile({ image: url, imageFile: file });
  };

  const handleAILogoGenerate = async (imageUrl) => {
    try {
      // Fetch the image from the URL
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a File object from the blob
      const file = new File([blob], "ai-generated-logo.png", {
        type: blob.type || "image/png",
      });

      // Update profile with both the URL (for preview) and File (for upload)
      updateProfile({
        image: imageUrl,
        imageFile: file, // ✅ Now it will be sent to backend
        aiGeneratedLogo: true,
      });
    } catch (error) {
      console.error("Error converting AI image to file:", error);
      // You might want to show an error to the user here
      alert("Failed to process AI-generated logo. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        icon={isPersonal ? "👤" : "🏢"}
        label={isPersonal ? "Full Name" : "Company Name"}
        value={currentProfile.name}
        onChange={(value) => updateProfile({ name: value })}
        placeholder={isPersonal ? "Hala Al-Issawi" : "Dot LinkMe Solutions"}
      />

      <FormField
        icon={isPersonal ? "💼" : "🏭"}
        label={isPersonal ? "Title / Role" : "Industry / Category"}
        value={currentProfile.title}
        onChange={(value) => updateProfile({ title: value })}
        placeholder={
          isPersonal
            ? "QA Engineer – NFC Systems"
            : "Smart NFC & Digital Identity"
        }
      />

      <FormField
        icon="📝"
        label={isPersonal ? "Short Bio" : "Description"}
        value={currentProfile.bio}
        onChange={(value) => updateProfile({ bio: value })}
        placeholder={
          isPersonal
            ? "Passionate about building clean, smart, and user-friendly systems."
            : "We help you turn your physical card into a smart NFC-powered identity."
        }
        multiline
        rows={3}
      />

      <ImageUpload
        label={isPersonal ? "Profile Image" : "Company Logo"}
        onChange={handleImageUpload}
        currentImage={currentProfile.image}
        isBusinessProfile={!isPersonal}
        onAIGenerate={handleAILogoGenerate}
        helperText="Recommended: square image (1:1) for best preview."
      />
    </div>
  );
}
