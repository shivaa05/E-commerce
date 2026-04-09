import { create } from "zustand";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import toast from "react-hot-toast";
export const useAuthStore = create((set, get) => ({
  user: null,

  loginFunction: async ({ email, password }) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      },{withCredentials: true});
      set({ user: res.data.user });
      console.log(res)
      toast.success("Login successful");
    } catch (error) {
      console.log("error in login function", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  },
  signupFunction: async ({ name, email, password, role }) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/register`, {
        name,
        email,
        password,
        role,
      },{withCredentials: true});
      set({ user: res.data.user });
      toast.success("Account created successfully");
      console.log(res)
    } catch (error) {
      console.log("error in signup function", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  },
  fetchLoggedInUser: async () => { 
    try {
      const res = await axios.get(`${BACKEND_URL}/api/auth/me`, {withCredentials: true});
      set({ user: res.data.user });
    } catch (error) {
      console.log("error in fetchLoggedInUser function", error);
      set({ user: null });
    }
  }
}));
