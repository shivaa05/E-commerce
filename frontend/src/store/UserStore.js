import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useUserStore = create((set, get) => ({
  cart: [],
  coupons: [],
  appliedCouponDiscount: null,
  appliedCoupon: null,
  getCartItems: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/product/get-cart-items`, {
        withCredentials: true,
      });
      set({ cart: res.data.cartItems });
      console.log(get().cart);
    } catch (error) {
      console.log("error in getCartItems function", error);
      set({ cart: [] });
    }
  },
  addToCart: async (productId) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/product/add-to-cart/${productId}`,
        { withCredentials: true },
      );
      get().getCartItems(); // Refresh cart items after adding to cart
      console.log(get().cart);
      toast.success(res.data.message);
    } catch (error) {
      console.log("error in addToCart function", error);
      toast.error("Failed to add product to cart");
    }
  },
  removeOneFromCart: async (productId) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/product/remove-from-cart/${productId}`,
        { withCredentials: true },
      );
      get().getCartItems(); // Refresh cart items after removing from cart
      toast.success(res.data.message);
    } catch (error) {
      console.log("error in removeFromCart function", error);
      toast.error("Failed to remove product from cart");
    }
  },

  removeAllFromCart: async (productId) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/product/remove-item-from-cart/${productId}`,
        { withCredentials: true },
      );
      get().getCartItems(); // Refresh cart items after removing item from cart
      toast.success(res.data.message);
    } catch (error) {
      console.log("error in removeAllFromCart function", error);
      toast.error("Failed to remove product from cart");
    }
  },

  clearCart: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/product/clear-cart`, {
        withCredentials: true,
      });
      get().getCartItems();
      toast.success(res.data.message);
    } catch (error) {
      console.log("error in clearCart function", error);
      toast.error("Failed to clear cart");
    }
  },

  fetchCoupons: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/auth/all-coupons`, {
        withCredentials: true,
      });
      set({ coupons: res.data.coupons });
    } catch (error) {
      console.log("error in fetchCoupons function", error);
      toast.error("Failed to fetch coupons");
      set({ coupons: [] });
    }
  },

  applyCoupon: async (couponCode) => {
    try {
      console.log("coupond Code",couponCode)
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/apply-coupon`,
        { couponCode },
        {
          withCredentials: true,
        },
      );
      set({ appliedCouponDiscount: res.data.discount, appliedCoupon: couponCode });
      toast.success(res.data.message);
    } catch (error) {
      console.log("error in applyCoupon function", error);
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },
}));
