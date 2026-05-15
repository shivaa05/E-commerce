import { create } from "zustand";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  fetchAllProducts: async (page = 1) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/product/get-all?page=${page}&limit=12`,
        {
          withCredentials: true,
        },
      );
      set({ products: res.data.products });
      return res.data.products;
    } catch (error) {
      console.log("error in fetchAllProducts function", error);
      set({ products: [] });
      return [];
    }
  },
  addProduct: async (productData) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/product/create`,
        productData,
        { withCredentials: true },
      );
      set((state) => ({ products: [...state.products, res.data.product] }));
      toast.success("Product created successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
      return false;
    }
  },
  updateProduct: async (id, productData) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/product/update/${id}`,
        productData,
        { withCredentials: true },
      );
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? res.data.product : p,
        ),
      }));
      toast.success("Product updated successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
      return false;
    }
  },
  updateStock: async (id, stock) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/product/update-stock/${id}`,
        { stock },
        { withCredentials: true },
      );
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? { ...p, stock: res.data.stock } : p,
        ),
      }));
      toast.success("Stock updated successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update stock");
      return false;
    }
  },
  deleteProduct: async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/product/delete/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));
      toast.success("Product deleted successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
      return false;
    }
  },
}));
