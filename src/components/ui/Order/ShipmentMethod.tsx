import React from "react";
import { OrderInfo } from "../../../App";

interface Props {
  orderInfo: OrderInfo;
  setOrderInfo: (info: OrderInfo) => void;
}

export const ShipmentMethod: React.FC<Props> = ({ orderInfo, setOrderInfo }) => {
  return (
    <section>
      <h3 className="font-semibold text-[#17183b] mb-4">Shipment Method</h3>
      <div className="space-y-3">
        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="shipment"
            value="free"
            checked={orderInfo.shipmentMethod === "free"}
            onChange={(e) => setOrderInfo({ ...orderInfo, shipmentMethod: e.target.value as 'free' | 'paid' })}
          />
          <span>Free Yangon</span>
        </label>

        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="shipment"
            value="paid"
            checked={orderInfo.shipmentMethod === "paid"}
            onChange={(e) => setOrderInfo({ ...orderInfo, shipmentMethod: e.target.value as 'free' | 'paid' })}
          />
          <span>$8.50 Mandalay</span>
        </label>
      </div>
    </section>
  );
};
