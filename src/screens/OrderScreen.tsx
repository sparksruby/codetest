import React, { useState } from "react";
import { Header } from "../components/ui/Header";
import { OrderInfo } from "../App";
import { useNavigate } from "react-router-dom";
import { PersonalInfoForm } from "../components/ui/Order/PersonalInfoForm";
import { ShipmentMethod } from "../components/ui/Order/ShipmentMethod";
import { PaymentMethod } from "../components/ui/Order/PaymentMethod";
import { OrderSummary } from "../components/ui/OrderSummary";

interface OrderScreenProps {
  orderInfo: OrderInfo;
  setOrderInfo: (info: OrderInfo) => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  completeOrder: () => void;
}

export const OrderScreen: React.FC<OrderScreenProps> = ({
  orderInfo,
  setOrderInfo,
  getCartItemCount,
  getCartTotal,
  completeOrder,
}) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const baseTotal = getCartTotal();
  const discount = baseTotal > 300 ? baseTotal * 0.1 : 0;
  const shipping = orderInfo.shipmentMethod === "paid" ? 8.5 : 0;
  const [couponApplied, setCouponApplied] = useState(0);

  const validateFields = () => {
    let valid = true;
    const newErrors = { name: "", email: "", phone: "", address: "" };

    if (!orderInfo.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!orderInfo.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(orderInfo.email)) {
        newErrors.email = "Invalid email format";
        valid = false;
      }
    }
    if (!orderInfo.phone.trim()) {
      newErrors.phone = "Phone is required";
      valid = false;
    } else {
      const phoneRegex = /^[0-9]{7,15}$/;
      if (!phoneRegex.test(orderInfo.phone)) {
        newErrors.phone = "Invalid phone number";
        valid = false;
      }
    }
    if (!orderInfo.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleBuy = () => {
    if (!validateFields()) return;
    completeOrder();
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onBack={() => navigate(-1)} getCartItemCount={getCartItemCount} />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#17183b] mb-8">Order Information</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PersonalInfoForm orderInfo={orderInfo} setOrderInfo={setOrderInfo} errors={errors} />
            <ShipmentMethod orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
            <PaymentMethod orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
          </div>

          <OrderSummary
            baseTotal={baseTotal}
            discount={discount}
            shipping={shipping}
            couponApplied={couponApplied}
            setCouponApplied={setCouponApplied}
            cartItemsCount={getCartItemCount()}
            estimatedDelivery="01 Feb, 2023"
            onAction={handleBuy}
            actionButtonLabel="Buy Now"
          />

        </div>
      </div>
    </div>
  );
};
