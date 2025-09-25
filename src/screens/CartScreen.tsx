import React from 'react';
import { Header } from '../components/ui/Header';
import { CartItem } from '../App';
import { useNavigate } from 'react-router-dom';
import { CartItemRow } from '../components/ui/Cart/CartItemRow';
import { DiscountBanner } from '../components/ui/Cart/DiscountBanner';
import { OrderSummary } from '../components/ui/OrderSummary';


interface CartScreenProps {
  cartItems: CartItem[];
  getCartItemCount: () => number;
  getCartTotal: () => number;
  updateCartQuantity: (id: string, newQuantity: number) => void;
  removeFromCart: (id: string) => void;
}



export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  getCartItemCount,
  getCartTotal,
  updateCartQuantity,
  removeFromCart
}) => {
  const navigate = useNavigate();

  const total = getCartTotal();
  const discount = total >= 150 ? total * 0.1 : 0;
  const couponApplied = 0;


  return (
    <div className="min-h-screen bg-white">
      <Header getCartItemCount={getCartItemCount} onBack={() => navigate(-1)} />

      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-12">
        <div className="flex items-baseline gap-3 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#17183b]">Cart</h1>
          <span className="text-gray-500 font-medium">{cartItems.length} ITEMS</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-16 text-center text-gray-500 col-span-3">
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="mb-4">Looks like you haven’t added anything to your cart yet.</p>
            <button
              className="bg-[#3AA39F] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2f807d]"
              onClick={() => navigate('/shop')}
            >
              Go Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  updateCartQuantity={updateCartQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
              {total >= 150 && <DiscountBanner />}
            </div>
       <OrderSummary
  baseTotal={total}
  discount={discount}
  shipping={0} // Cart usually doesn't calculate shipping yet
  couponApplied={couponApplied}
  cartItemsCount={cartItems.length}
  setCouponApplied={(amount) => console.log("Coupon applied:", amount)}
   estimatedDelivery="Oct 1 - Oct 5"
  onAction={() => navigate("/order")}
  actionButtonLabel="Checkout"
/>

          </div>
        )}
      </div>
    </div>
  );
};