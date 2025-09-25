import React, { useState } from "react";

interface OrderSummaryProps {
  baseTotal: number;
  discount?: number;
  shipping?: number;
  couponApplied?: number;
  cartItemsCount?: number;
  estimatedDelivery?: string;

  // Optional actions
  onAction?: () => void;
  actionButtonLabel?: string;

  // Coupon input
  showCouponInput?: boolean;
  setCouponApplied?: (amount: number) => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  baseTotal,
  discount = 0,
  shipping = 0,
  couponApplied = 0,
  estimatedDelivery,
  onAction,
  actionButtonLabel,
  showCouponInput = true,
  setCouponApplied,
}) => {
  const [coupon, setCoupon] = useState("");

  const finalTotal = baseTotal - discount + shipping - couponApplied;

  const handleApplyCoupon = () => {
    if (!setCouponApplied) return;

    if (coupon.trim().toLowerCase() === "save10") {
      setCouponApplied(10);
    } else {
      setCouponApplied(0);
      alert("Invalid coupon code");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-w-sm mx-auto">
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 text-lg mb-6">Order Summary</h3>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price</span>
            <span className="text-gray-900 font-medium">${baseTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="text-gray-900 font-medium">${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-teal-600 font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Coupon Applied</span>
            <span className="text-gray-900 font-medium">${couponApplied.toFixed(2)}</span>
          </div>
        </div>

        <hr className="border-gray-200 mb-4" />

        <div className="flex justify-between text-lg font-semibold mb-4">
          <span className="text-gray-900">TOTAL</span>
          <span className="text-gray-900">${finalTotal.toFixed(2)}</span>
        </div>

        {estimatedDelivery && (
          <div className="flex justify-between text-sm mb-6">
            <span className="text-gray-600">Estimated Delivery by</span>
            <span className="text-gray-900 font-medium">{estimatedDelivery}</span>
          </div>
        )}

        {showCouponInput && setCouponApplied && (
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <button
              onClick={handleApplyCoupon}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </button>
          </div>
        )}

        {onAction && (
          <button
            onClick={onAction}
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            {actionButtonLabel ?? "Proceed to Checkout"}
          </button>
        )}
      </div>
    </div>
  );
};

