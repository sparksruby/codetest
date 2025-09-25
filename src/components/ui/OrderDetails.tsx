import React from "react";
import { OrderInfo } from "../../App";

export const OrderDetails: React.FC<{ orderInfo: OrderInfo; orderNumber: string }> = ({ orderInfo, orderNumber }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold text-[#17183b] mb-2">Order Number</h3>
        <p className="text-gray-700">{orderNumber}</p>
      </div>
      <div>
        <h3 className="font-semibold text-[#17183b] mb-2">Name</h3>
        <p className="text-gray-700">{orderInfo.name}</p>
      </div>
      <div>
        <h3 className="font-semibold text-[#17183b] mb-2">Email Address</h3>
        <p className="text-gray-700">{orderInfo.email}</p>
      </div>
      <div>
        <h3 className="font-semibold text-[#17183b] mb-2">Phone Number</h3>
        <p className="text-gray-700">{orderInfo.phone}</p>
      </div>
      <div>
        <h3 className="font-semibold text-[#17183b] mb-2">Shipment</h3>
        <p className="text-gray-700">
          {orderInfo.shipmentMethod === "free" ? "Free (Yangon)" : "$8.50 (Mandalay)"}
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-[#17183b] mb-2">Payment Method</h3>
        <p className="text-gray-700">
          {orderInfo.paymentMethod === "cash" ? "Cash on delivery" : "KBZ Pay"}
        </p>
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-[#17183b] mb-2">Address</h3>
      <p className="text-gray-700">{orderInfo.address}</p>
    </div>
  </div>
);