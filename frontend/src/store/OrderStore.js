import { create } from "zustand";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import toast from "react-hot-toast";

export const useOrderStore = create((set, get) => ({
  allOrders: [],
  fetchAllOrders: async () => { 
    try {
      const res = await axios.get(`${BACKEND_URL}/api/admin/get-all-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      set({ allOrders: res.data });
    } catch (error) {
      console.log("Error in fetching all orders", error);
      toast.error("Error in fetching all orders");
    }
  }
}));