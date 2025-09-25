import React from "react";
import { OrderInfo } from "../../../App";

interface Props {
  orderInfo: OrderInfo;
  setOrderInfo: (info: OrderInfo) => void;
}

export const PaymentMethod: React.FC<Props> = ({ orderInfo, setOrderInfo }) => {
  return (
    <section>
      <h3 className="font-semibold text-[#17183b] mb-4">Payment Method</h3>
      <div className="space-y-3">
        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={orderInfo.paymentMethod === "cash"}
            onChange={(e) => setOrderInfo({ ...orderInfo, paymentMethod: e.target.value as 'cash' | 'kbz' })}
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
            checked={orderInfo.paymentMethod === "kbz"}
            onChange={(e) => setOrderInfo({ ...orderInfo, paymentMethod: e.target.value as 'cash' | 'kbz' })}
          />
          <div>
            <div className="font-semibold">KBZ Pay</div>
            <div className="text-sm text-gray-600">Digital Payment</div>
          </div>
        </label>
      </div>
    </section>
  );
};
