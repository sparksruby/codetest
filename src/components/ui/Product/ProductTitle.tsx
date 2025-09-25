import React from "react";
import { Star } from "lucide-react";

export const ProductTitle: React.FC = () => (
  <>
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold text-[#17183b] leading-[1.2] tracking-tight">
      Meryl Lounge Chair
    </h1>

    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-3 mt-2">
      <div className="text-xl sm:text-2xl md:text-2xl font-semibold text-[#17183b] tracking-[0.15px]">
        $149.99
      </div>

      <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-0">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-[#17183b] text-sm sm:text-base">4.6 / 5.0</span>
        <span className="text-[#a2a3b1] text-sm sm:text-base">(556)</span>
      </div>
    </div>
  </>
);
