import React from 'react';
import { Minus, Plus } from "lucide-react";
import { CartItem } from '../../../App';

interface CartItemRowProps {
  item: CartItem;
  updateCartQuantity: (id: string, newQuantity: number) => void;
  removeFromCart: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  updateCartQuantity,
  removeFromCart
}) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border-b pb-6">
    <img
      src={item.image}
      alt={item.name}
      className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-teal-100 object-cover"
    />
    <div className="flex-1 w-full">
      <h3 className="text-lg font-semibold text-[#17183b]">{item.name}</h3>
      <p className="text-gray-500 text-sm">
        Color <span className="capitalize">{item.color}</span>
      </p>
      <div className="flex items-center mt-4">
        <button
          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
          className="w-9 h-9 flex items-center justify-center border rounded hover:bg-gray-50"
        >
          <Minus className="w-4 h-4 text-[#17183b]" />
        </button>
        <span className="w-10 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
          className="w-9 h-9 flex items-center justify-center border rounded hover:bg-gray-50"
        >
          <Plus className="w-4 h-4 text-[#17183b]" />
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-3 sm:ml-6 text-red-500 text-sm hover:underline font-semibold"
        >
          Remove
        </button>
      </div>
    </div>
    <div className="text-lg font-semibold text-[#17183b] mt-2 sm:mt-0">
      ${item.price.toFixed(2)}
    </div>
  </div>
);