import React, { useState } from "react";
import { Search, X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Brand colors from your theme
  const colors = {
    primary: "#0066ff",
    dark: "#0b0f19",
    accent: "#f2a91d",
    light: "#f5f5f5",
    white: "#ffffff",
  };

  const images = [
    {
      src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      title: "Craft Tools",
      category: "Workshop",
    },
    {
      src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      title: "Golden Ring",
      category: "Jewelry",
    },
    {
      src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      title: "Mountain Lake",
      category: "Nature",
    },
    {
      src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      title: "Northern Lights",
      category: "Nature",
    },
    {
      src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      title: "Modern Home",
      category: "Architecture",
    },
    {
      src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      title: "Alpine Peaks",
      category: "Nature",
    },
    {
      src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      title: "Starry Mountain",
      category: "Nature",
    },
    {
      src: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      title: "Scenic Valley",
      category: "Travel",
    },
  ];

  const categories = [
    "All",
    "Nature",
    "Architecture",
    "Travel",
    "Jewelry",
    "Workshop",
  ];

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const columns = [[], [], [], []];
  filteredImages.forEach((img, idx) => {
    columns[idx % 4].push(img);
  });

  return (
    <div
      className="min-h-screen p-8 "
      style={{
        background:
          "linear-gradient(135deg, #0b0f19 0%, #101522 40%, #16203a 100%)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-12 mt-20">
        <h1 className="text-5xl font-bold mb-4" style={{ color: colors.white }}>
          Visual <span style={{ color: colors.primary }}>Gallery</span>
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: colors.light, opacity: 0.6 }}
        >
          Explore our curated collection of stunning photography
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {columns.map((column, colIdx) => (
          <div key={colIdx} className="grid gap-4">
            {column.map((img, imgIdx) => (
              <div
                key={imgIdx}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(img)}
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Glow Effect */}
                <div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  }}
                />

                {/* Image Container */}
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{ backgroundColor: colors.dark }}
                >
                  <img
                    className="h-auto w-full object-cover transition-all duration-700 group-hover:scale-110"
                    src={img.src}
                    alt={img.title}
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: `linear-gradient(to top, ${colors.dark}ee, ${colors.dark}33, transparent)`,
                    }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                        style={{
                          backgroundColor: colors.accent,
                          color: colors.dark,
                        }}
                      >
                        {img.category}
                      </span>
                      <h3
                        className="font-semibold text-lg"
                        style={{ color: colors.white }}
                      >
                        {img.title}
                      </h3>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div
                    className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                    style={{ backgroundColor: `${colors.primary}cc` }}
                  >
                    <Search size={20} color={colors.white} />
                  </div>

                  {/* Border Accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: colors.primary }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: `${colors.dark}f5` }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-xl w-full">
            {/* Close Button */}
            <button
              className="absolute -top-10 right-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              onClick={() => setSelectedImage(null)}
            >
              <X size={16} color={colors.white} />
            </button>

            {/* Image */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: `2px solid ${colors.primary}33` }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[50vh] object-contain"
                style={{ backgroundColor: colors.dark }}
              />
            </div>

            {/* Info */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-xs font-medium mb-1"
                  style={{ backgroundColor: colors.accent, color: colors.dark }}
                >
                  {selectedImage.category}
                </span>
                <h2
                  className="text-lg font-bold"
                  style={{ color: colors.white }}
                >
                  {selectedImage.title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div
        className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: colors.primary }}
      />
      <div
        className="fixed bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-10"
        style={{ background: colors.accent }}
      />
    </div>
  );
};

export default Gallery;
