import React, { useState } from 'react';
import { Header } from '../components/ui/Header';
import { OrderInfo } from '../App';
import { useNavigate } from 'react-router-dom';

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
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(0);

  // Validation error state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const baseTotal = getCartTotal();
  const discount = baseTotal > 300 ? baseTotal * 0.1 : 0;
  const shipping = orderInfo.shipmentMethod === 'paid' ? 8.5 : 0;
  const finalTotal = baseTotal - discount + shipping - couponApplied;

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === 'save10') {
      setCouponApplied(10);
    } else {
      setCouponApplied(0);
      alert('Invalid coupon code');
    }
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = { name: '', email: '', phone: '', address: '' };

    if (!orderInfo.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!orderInfo.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(orderInfo.email)) {
        newErrors.email = 'Invalid email format';
        valid = false;
      }
    }

    if (!orderInfo.phone.trim()) {
      newErrors.phone = 'Phone is required';
      valid = false;
    } else {
      const phoneRegex = /^[0-9]{7,15}$/;
      if (!phoneRegex.test(orderInfo.phone)) {
        newErrors.phone = 'Invalid phone number';
        valid = false;
      }
    }

    if (!orderInfo.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleBuy = () => {
    if (!validateFields()) return;

    completeOrder();
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onBack={() => navigate(-1)} getCartItemCount={getCartItemCount} />

      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#17183b] mb-8">Order Information</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Info */}
            <section>
              <h3 className="font-semibold text-[#17183b] mb-4">Personal information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={orderInfo.name}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, name: e.target.value })
                    }
                    className="p-3 border border-gray-300 rounded-lg w-full"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={orderInfo.email}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, email: e.target.value })
                    }
                    className="p-3 border border-gray-300 rounded-lg w-full"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="md:col-span-2">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={orderInfo.phone}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, phone: e.target.value })
                    }
                    className="p-3 border border-gray-300 rounded-lg w-full"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <textarea
                    placeholder="Address"
                    value={orderInfo.address}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, address: e.target.value })
                    }
                    className="p-3 border border-gray-300 rounded-lg w-full h-24"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
            </section>

            {/* Shipment */}
            <section>
              <h3 className="font-semibold text-[#17183b] mb-4">Shipment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shipment"
                    value="free"
                    checked={orderInfo.shipmentMethod === 'free'}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, shipmentMethod: e.target.value as 'free' | 'paid' })
                    }
                  />
                  <span>Free Yangon</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shipment"
                    value="paid"
                    checked={orderInfo.shipmentMethod === 'paid'}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, shipmentMethod: e.target.value as 'free' | 'paid' })
                    }
                  />
                  <span>$8.50 Mandalay</span>
                </label>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h3 className="font-semibold text-[#17183b] mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={orderInfo.paymentMethod === 'cash'}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, paymentMethod: e.target.value as 'cash' | 'kbz' })
                    }
                  />
                  <div>
                    <div className="font-semibold">Cash on delivery</div>
                    <div className="text-sm text-gray-600">Regular payment</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="kbz"
                    checked={orderInfo.paymentMethod === 'kbz'}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, paymentMethod: e.target.value as 'cash' | 'kbz' })
                    }
                  />
                  <div>
                    <div className="font-semibold">KBZ Pay</div>
                    <div className="text-sm text-gray-600">Digital Payment</div>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Right: Summary */}
          <aside className="bg-gray-50 p-4 sm:p-6 rounded-lg h-fit">
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
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
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
        </div>
      </div>
    </div>
  );
};