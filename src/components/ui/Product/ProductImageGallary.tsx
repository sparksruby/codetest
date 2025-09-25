import React, { useState } from "react";

interface Props {
  images: string[];
  selectedIndex: number;
  onSelect: (idx: number) => void;
  demoImage?: string; // 👈 optional demo image
}

export const ProductImageGallery: React.FC<Props> = ({
  images,
  selectedIndex,
  onSelect,
  demoImage = "/product-image.png",
}) => {
  const [hasUserSelected, setHasUserSelected] = useState(false);

  // Decide what to show in main view
  const mainSrc = hasUserSelected
    ? images[selectedIndex]
    : demoImage;

  const handleSelect = (idx: number) => {
    setHasUserSelected(true);
    onSelect(idx);
  };

  return (
    <div className="flex flex-col items-start w-full">
      {/* Main image */}
      <div className="w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[480px] flex items-center justify-center bg-white ">
        <img
          src={mainSrc}
          alt="Product"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Indicator only after selection */}
      {hasUserSelected && (
        <div className="w-full flex justify-start mb-3 px-1">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#17183b] mr-1">
            {String(selectedIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-base sm:text-lg md:text-xl font-semibold text-[#a2a3b1]">
            / {String(images.length).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* Thumbnails */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 w-full">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => handleSelect(index)}
            className={`aspect-square rounded-lg overflow-hidden flex items-center justify-center cursor-pointer transition
              ${selectedIndex === index && hasUserSelected
                ? "border-2 border-[#3AA39F] ring-2 ring-[#3AA39F]/30"
                : "border border-[#E5E7EB] hover:border-[#3AA39F]"
              }`}
            style={{ background: "#fff" }}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
