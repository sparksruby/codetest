import React from 'react';
import { Percent } from "lucide-react";

export const DiscountBanner: React.FC = () => (
  <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 flex items-center gap-3">
<div className="w-6 h-6 flex items-center justify-center rounded">
  <Percent className="w-4 h-4" style={{ color: "#3AA39F" }} />
</div>
    <p className="text-blue-900 text-sm">
      10% Instant Discount with Federal Bank Debit Cards on a min spend of $150. TCA
    </p>
  </div>
);