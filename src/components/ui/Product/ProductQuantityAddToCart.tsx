import React from "react";
import { Minus, Plus } from "lucide-react";

interface Props {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onAddToCart: () => void;
}

export const ProductQuantityAddToCart: React.FC<Props> = ({
  quantity,
  onDecrease,
  onIncrease,
  onAddToCart
}) => (
  <div className="flex flex-col sm:flex-row gap-4 mt-8">
    <div className="flex items-center border border-[#a2a3b1] rounded h-[52px] px-3">
      <button onClick={onDecrease} className="p-1">
        <Minus className="w-5 h-5 text-[#17183b]" />
      </button>
      <span className="mx-6 text-xl font-semibold text-[#17183b]">
        {quantity}
      </span>
      <button onClick={onIncrease} className="p-1">
        <Plus className="w-5 h-5 text-[#17183b]" />
      </button>
    </div>
    <button
      onClick={onAddToCart}
      className="flex items-center justify-center bg-[#3AA39F] text-white px-8 md:px-10 h-[52px] rounded font-semibold text-base hover:bg-[#4b8785]/90 transition-colors"
    >
      Add to Cart
    </button>
  </div>
);