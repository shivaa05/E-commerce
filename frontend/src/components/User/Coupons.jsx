import React, { useState } from "react";
import { useUserStore } from "../../store/UserStore";
import { ChevronDown, ChevronRight, CreditCard } from "lucide-react";

const Coupons = () => {
  const { coupons, applyCoupon, appliedCoupon } = useUserStore();
  const [showCoupons, setShowCoupons] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  
  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code");
      return;
    }
    const code = couponCode.trim();
    applyCoupon(code);
  }
  return (
    <div className="p-4">
      <div className="text-xl font-semibold tracking-wider flex justify-between items-center text-[#2d2e35] mb-2">
        <span>APPLY COUPONS</span>
        <span
          className="text-rose-600/90 cursor-pointer flex gap-1 items-center"
          onClick={() => setShowCoupons(!showCoupons)}
        >
          {showCoupons ? (
            <>
              Hide coupons
              <ChevronDown />
            </>
          ) : (
            <>
              All coupons <ChevronRight />
            </>
          )}
        </span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-rose-600/90 font-semibold tracking-wider text-white rounded-lg hover:bg-rose-500 cursor-pointer"
          onClick={handleApplyCoupon}
        >
          APPLY
        </button>
      </div>

      {/* All coupons */}
      {showCoupons && (
        <div className="mt-2">
          {coupons.length == 0 ? (
            <div className="text-center mt-4 text-gray-500">
              No coupons available
            </div>
          ) : (
            coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="p-2 border-b border-gray-300 flex justify-between items-center"
              >
                <div>
                  <div className="text-rose-600 font-bold text-lg">
                    {coupon.couponCode}
                  </div>
                  <div className="text-zinc-500">
                    Get FLAT {coupon.discount}% off
                  </div>
                </div>

                <div
                  className="cursor-pointer overflow-hidden rounded-xl w-30 text-center text-zinc-200"
                  onClick={() => applyCoupon(coupon.couponCode)}
                >
                  {appliedCoupon === coupon.couponCode ? (
                    <div className="bg-green-600/70 py-2 cursor-not-allowed">
                      Applied
                    </div>
                  ) : (
                    <div className="bg-green-600 py-2">Apply</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Coupons;
