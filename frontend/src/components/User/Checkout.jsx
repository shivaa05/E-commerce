import React from "react";
import { ChevronRight, CreditCard } from "lucide-react";
import { useUserStore } from "../../store/UserStore";
const Checkout = () => {
  const { cart } = useUserStore();
  const totalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0,
    );
  };
  const totalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <div className="">
      <div className="tracking-wider text-xl font-semibold px-4 py-3 bg-zinc-200 flex items-center gap-2 text-rose-600">
        <CreditCard className="size-7" />
        CHECKOUT
      </div>

      {/* Coupon */}

      <div className="p-4">
        <div className="text-xl font-semibold tracking-wider flex justify-between items-center text-[#2d2e35] mb-2">
          <span>APPLY COUPONS</span>
          <span className="text-rose-600/90 cursor-pointer flex gap-1 items-center">All coupons
          
          <ChevronRight/></span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
          />
          <button className="mt-2 px-4 py-2 bg-rose-600/90 font-semibold tracking-wider text-white rounded-lg hover:bg-rose-500 cursor-pointer">
            APPLY
          </button>
        </div>

        {/* All coupons */}
        <div></div>
      </div>

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
            <span className="text-teal-600 font-bold">- ₹0</span>
          </div>
          <div className="flex justify-between items-center font-bold text-[#2c2d34]">
            <span>FINAL PRICE:</span>
            <span className="text-red-600">₹{totalPrice().toFixed(2)}</span>
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
