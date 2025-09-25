import React from "react";
import { OrderInfo } from "../../../App";

interface Props {
  orderInfo: OrderInfo;
  setOrderInfo: (info: OrderInfo) => void;
  errors: { name: string; email: string; phone: string; address: string };
}

export const PersonalInfoForm: React.FC<Props> = ({ orderInfo, setOrderInfo, errors }) => {
  return (
    <section>
      <h3 className="font-semibold text-[#17183b] mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={orderInfo.name}
            onChange={(e) => setOrderInfo({ ...orderInfo, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={orderInfo.email}
            onChange={(e) => setOrderInfo({ ...orderInfo, email: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="md:col-span-2">
          <input
            type="tel"
            placeholder="Phone Number"
            value={orderInfo.phone}
            onChange={(e) => setOrderInfo({ ...orderInfo, phone: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="md:col-span-2">
          <textarea
            placeholder="Address"
            value={orderInfo.address}
            onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-full h-24"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
      </div>
    </section>
  );
};
