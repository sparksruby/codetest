import React from 'react';
import { Header } from '../components/ui/Header';
import { ToastMessage } from '../components/ui/OrderConfirm/ToastMessage';
import { SectionTitle } from '../components/ui/OrderConfirm/SectionTitle';
import { OrderDetails } from '../components/ui/OrderConfirm/OrderDetails';
import { OrderSummary } from '../components/ui/OrderSummary';
import { OrderInfo } from '../App';
import { useNavigate } from 'react-router-dom';

interface OrderConfirmationScreenProps {
  orderInfo: OrderInfo;
  orderNumber: string;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  resetApp: () => void;
  discount?: number;
  couponApplied?: number;
}

// You could also make this dynamic, e.g. from props or state
const orderSuccessMessage = "Order created successfully!";

export const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  orderInfo,
  orderNumber,
  getCartItemCount,
  getCartTotal,
  resetApp,
  discount = 0,
  couponApplied = 0
}) => {
  const navigate = useNavigate();
  const baseTotal = getCartTotal();
  const shipping = orderInfo.shipmentMethod === 'paid' ? 8.5 : 0;


  const handleBackToShop = () => {
    resetApp();
    navigate('/'); // go to product page
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onBack={() => navigate(-1)} getCartItemCount={getCartItemCount} />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <ToastMessage message={orderSuccessMessage} type="success" duration={2000} />
        <SectionTitle title="Order Information" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <OrderDetails orderInfo={orderInfo} orderNumber={orderNumber} />
          </div>
       <OrderSummary
  baseTotal={baseTotal}
  discount={discount}
  shipping={shipping}
  couponApplied={couponApplied}
  cartItemsCount={getCartItemCount()}
  onAction={handleBackToShop}
   estimatedDelivery="01 Feb, 2023"
  actionButtonLabel="Back to Shop"
  showCouponInput={false} // no coupon input after order

/>

        </div>
      </div>
    </div>
  );
};