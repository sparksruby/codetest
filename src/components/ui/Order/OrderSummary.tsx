import React, { useState } from "react";

interface Props {
  baseTotal: number;
  discount: number;
  shipping: number;
  couponApplied: number;
  setCouponApplied: (val: number) => void;
  handleBuy: () => void;
}

export const OrderSummary: React.FC<Props> = ({
  baseTotal,
  discount,
  shipping,
  couponApplied,
  setCouponApplied,
  handleBuy,
}) => {
  const [coupon, setCoupon] = useState("");

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === "save10") {
      setCouponApplied(10);
    } else {
      setCouponApplied(0);
      alert("Invalid coupon code");
    }
  };

  const finalTotal = baseTotal - discount + shipping - couponApplied;

  return (
    <aside className="bg-gray-50 p-4 sm:p-6 rounded-lg h-fit">
      <h3 className="font-semibold text-[#17183b] mb-4">Order Summary</h3>

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
          <span>{shipping === 0 ? <span className="text-[#3AA39F]">Free</span> : `$${shipping.toFixed(2)}`}</span>
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

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Estimated Delivery by</p>
        <p className="font-semibold">01 Feb, 2023</p>
      </div>

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

      <button
        onClick={handleBuy}
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700"
      >
        Buy
      </button>
    </aside>
  );
};
