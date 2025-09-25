import React from "react";

interface OrderSummaryProps {
  baseTotal: number;
  discount: number;
  shipping: number;
  couponApplied: number;
  finalTotal: number;
  onBackToShop: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  baseTotal, discount, shipping, couponApplied, finalTotal, onBackToShop
}) => (
  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg h-fit">
    <h3 className="font-semibold text-[#17183b] mb-4">Order Summary</h3>
    <div className="space-y-3 mb-4">
      <div className="flex justify-between">
        <span>Price</span>
        <span>${baseTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Discount</span>
        <span className="text-green-600">-${discount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
      </div>
      <div className="flex justify-between">
        <span>Coupon Applied</span>
        <span>-${couponApplied.toFixed(2)}</span>
      </div>
      <hr />
      <div className="flex justify-between font-semibold text-lg">
        <span>TOTAL</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>
    </div>
    <div className="mb-6">
      <p className="text-sm text-gray-600 mb-2">Estimated Delivery by</p>
      <p className="font-semibold">01 Feb, 2023</p>
    </div>
    <button
      onClick={onBackToShop}
      className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700"
    >
      Back to Shop
    </button>
  </div>
);