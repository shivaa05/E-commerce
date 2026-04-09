import { create } from "zustand";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useProductStore = create((set, get) => ({
  products: [],
  fetchAllProducts: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/product/get-all`, { withCredentials: true });
      set({ products: res.data.products });
      console.log(get().products)
    } catch (error) {
      console.log("error in fetchAllProducts function", error);
      set({ products: [] });
    }
  },
}));
