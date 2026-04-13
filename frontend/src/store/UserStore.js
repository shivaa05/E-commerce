import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useUserStore = create((set, get) => ({
  cart: [],
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
  removeFromCart: async (productId) => {
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
}));
