import React, { useState } from "react";

interface OrderSummaryProps {
  baseTotal: number;
  discount?: number;
  shipping?: number;
  couponApplied?: number;
  cartItemsCount?: number;
  estimatedDelivery?: string; // New prop

  // Optional actions
  onAction?: () => void; // generic button action
  actionButtonLabel?: string; // text for the button

  // Coupon input
  showCouponInput?: boolean;
  setCouponApplied?: (amount: number) => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  baseTotal,
  discount = 0,
  shipping = 0,
  couponApplied = 0,
  cartItemsCount,
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
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg h-fit">
      <h3 className="font-semibold text-[#17183b] mb-4">Order Summary</h3>

      {cartItemsCount !== undefined && (
        <p className="text-sm text-gray-500 mb-2">{cartItemsCount} items</p>
      )}

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span>Price</span>
          <span>${baseTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-[#3AA39F]">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Coupon Applied</span>
          <span>-${couponApplied.toFixed(2)}</span>
        </div>
        {estimatedDelivery && (
          <div className="flex justify-between text-gray-600">
            <span>Estimated Delivery By</span>
            <span>{estimatedDelivery}</span>
          </div>
        )}
        <hr />
        <div className="flex justify-between font-semibold text-lg">
          <span>TOTAL</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {showCouponInput && setCouponApplied && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
          />
          <button
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Apply
          </button>
        </div>
      )}

      {onAction && (
        <button
          onClick={onAction}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700"
        >
          {actionButtonLabel ?? "Proceed"}
        </button>
      )}
    </div>
  );
};
