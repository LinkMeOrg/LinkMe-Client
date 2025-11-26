import React from "react";
import { Wallet } from "lucide-react";

export default function PaymentMethodSection() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Payment Method
      </h2>
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Wallet className="h-7 w-7 text-green-700" />
          </div>

          <div className="space-y-3">
            {/* Option 1 */}
            <div>
              <p className="font-semibold text-green-900">Cash on Delivery</p>
              <p className="text-sm text-green-700">
                Pay when you receive your card
              </p>
            </div>

            {/* Option 2 - CLICK Payment */}
            <div>
              <p className="font-semibold text-blue-900">Click Payment</p>
              <p className="text-sm text-blue-700">
                Send the payment instantly via Click using the name "HALAISSAWI"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
