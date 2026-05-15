import React, { useState } from "react";
import { useUserStore } from "../../store/UserStore";
import { useAuthStore } from "../../store/AuthStore";
import axios from "axios";

const PaymentForm = ({ amount, couponDiscount }) => {
  const { cart, clearCart } = useUserStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  console.log(couponDiscount)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/place-order`,
        {
          fullname: user.name || "Default User",
          orderItems: cart.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          })),
          address: "123 Main St",
          city: "Default City",
          postalCode: "123456",
          country: "India",
          state: "Default State",
          couponDiscount: couponDiscount || 0,
          // productDiscount: productDiscount || 0,
        },
        { withCredentials: true },
      );

      // Redirect to Stripe Checkout
      if (data.paymentResponse && data.paymentResponse.url) {
        window.location.href = data.paymentResponse.url;
      }
    } catch (error) {
      console.error(error);
      alert("Failed to initiate checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-xl text-lg cursor-pointer bg-rose-600/90 hover:bg-rose-500/70 text-white font-semibold tracking-wider"
      >
        {loading
          ? "Redirecting..."
          : `Checkout via Stripe ₹${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;
