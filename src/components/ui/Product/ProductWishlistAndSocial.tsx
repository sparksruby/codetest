import React from "react";
import { Heart } from "lucide-react";

interface Props {
  socialImgs: string[];
}

export const ProductWishlistAndSocial: React.FC<Props> = ({ socialImgs }) => (
  <div className="flex items-center justify-between w-full mt-6">
    {/* Wishlist Button */}
    <button className="flex items-center gap-2 text-[#3AA39F] hover:text-[#2e7d7a] transition-colors">
      <Heart className="w-5 h-5" />
      <span className="font-semibold text-sm sm:text-base">Add to Wishlist</span>
    </button>

    {/* Social Icons */}
    <div className="flex gap-4 sm:gap-5">
      {socialImgs.map((s, index) => (
        <img
          key={index}
          src={s}
          alt={`Social ${index + 1}`}
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain cursor-pointer hover:opacity-80 transition-opacity"
        />
      ))}
    </div>
  </div>
);
