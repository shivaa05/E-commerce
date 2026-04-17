import React, { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import { useUserStore } from "../../store/UserStore"
import Coupons from "./Coupons";
const Checkout = () => {
  const { cart, fetchCoupons, appliedCouponDiscount } = useUserStore();

  const totalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0,
    );
  };
  const totalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const couponDiscount = appliedCouponDiscount ? appliedCouponDiscount/100 : 0;

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="">
      <div className="tracking-wider text-xl font-semibold px-4 py-3 bg-zinc-200 flex items-center gap-2 text-rose-600">
        <CreditCard className="size-7" />
        CHECKOUT
      </div>

      {/* Coupon */}
      <Coupons />

      <div className="p-4">
        <div className="text-lg font-semibold flex gap-2 items-center text-[#2d2e35]">
          <span>PRICE DETAILS:</span>
          <span className="text-[17px] text-rose-600 font-bold">
            (TOTAL ITEMS: {totalQuantity()} items )
          </span>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex justify-between items-center text-[#2c2d34]">
            <span>TOTAL MRP:</span>
            <span className="font-bold">₹{totalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-[#2c2d34]">
            <span>PRODUCT DISCOUNT:</span>
            <span className="text-teal-600 font-bold">- ₹0</span>
          </div>
          <div className="flex justify-between items-center text-[#2c2d34]">
            <span>COUPON DISCOUNT:</span>
            <span className="text-teal-600 font-bold">- ₹{((totalPrice() * couponDiscount)).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center font-bold text-[#2c2d34]">
            <span>FINAL PRICE:</span>
            <span className="text-red-600">₹{((totalPrice() - totalPrice() * couponDiscount)).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <button className="w-full py-2 rounded-xl text-lg cursor-pointer bg-rose-600/90 hover:bg-rose-500/70 text-white font-semibold tracking-wider">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default Checkout;
