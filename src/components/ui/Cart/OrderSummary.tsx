import React from "react";
import { Tag } from "lucide-react";

interface OrderSummaryProps {
  total: number;
  discount: number;
  couponApplied: number;
  finalTotal: number;
  cartItemsCount: number;
  onCheckout: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  total,
  discount,
  couponApplied,
  finalTotal,
  cartItemsCount,
  onCheckout,
}) => (
  <div className="bg-white border rounded-lg p-4 sm:p-6 shadow-sm h-fit">
    <h3 className="font-semibold text-[#17183b] mb-4">Order Summary</h3>
    <div className="space-y-3 mb-4 text-sm">
      <div className="flex justify-between">
        <span>Price</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Discount</span>
        <span className="">-${discount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span className="text-[#3AA39F]">Free</span>

      </div>
      <div className="flex justify-between">
        <span>Coupon Applied</span>
        <span>${couponApplied.toFixed(2)}</span>
      </div>
      <hr />
      <div className="flex justify-between font-semibold text-lg">
        <span>TOTAL</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>
    </div>
    <div className="mb-4">
      <p className="text-xs text-gray-500">Estimated Delivery by</p>
      <p className="font-semibold text-[#17183b]">01 Feb, 2023</p>
    </div>
    <div className="mb-4 relative">
      <input
        type="text"
        placeholder="Coupon Code"
        className="w-full p-3 border rounded-lg pr-10"
      />
      <Tag className="w-5 h-5 text-gray-400 absolute right-3 top-3" />
    </div>
    <button
      onClick={onCheckout}
      disabled={cartItemsCount === 0}
      className="w-full bg-[#3AA39F] text-white py-3 rounded-lg font-semibold hover:bg-[#2f807d] disabled:opacity-50 transition-colors"
    >
      Proceed to Checkout
    </button>
  </div>
);