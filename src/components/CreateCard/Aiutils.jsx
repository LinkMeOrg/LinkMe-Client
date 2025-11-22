// Enhanced AI Logo Generation
export const generateAILogo = async (prompt) => {
  try {
    const enhancedPrompt = `Professional minimalist logo design, ${prompt}, vector art style, flat design, simple geometric shapes, clean lines, modern corporate identity, centered composition, solid white background, high contrast, professional branding, masterpiece`;

    const seed = Math.floor(Math.random() * 1000000);

    const params = new URLSearchParams({
      width: "512",
      height: "512",
      seed: seed.toString(),
      nologo: "true",
      enhance: "true",
      model: "flux",
      negative:
        "blurry, low quality, pixelated, messy, complex, cluttered, text, watermark, realistic photo",
    });

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      enhancedPrompt
    )}?${params.toString()}`;

    return imageUrl;
  } catch (error) {
    console.error("AI Logo generation error:", error);
    throw error;
  }
};

// Enhanced AI Background Generation
export const generateAIImage = async (prompt) => {
  try {
    const enhancedPrompt = `Abstract professional business card background, ${prompt}, high quality, modern design, smooth gradient, elegant, clean, minimalist aesthetic, premium look, studio lighting, ultra detailed, masterpiece quality`;

    const seed = Math.floor(Math.random() * 1000000);

    const params = new URLSearchParams({
      width: "800",
      height: "500",
      seed: seed.toString(),
      nologo: "true",
      enhance: "true",
      model: "flux",
      negative:
        "text, watermark, logo, people, faces, low quality, blurry, grainy, artifacts",
    });

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      enhancedPrompt
    )}?${params.toString()}`;

    return imageUrl;
  } catch (error) {
    console.error("AI Image generation error:", error);
    throw error;
  }
};
