import { create } from "zustand";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import toast from "react-hot-toast";
export const useAuthStore = create((set, get) => ({
  user: null,
  cart: [],

  loginFunction: async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      set({ user: res.data.user });
      console.log(res);
      toast.success("Login successful");
    } catch (error) {
      console.log("error in login function", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  },
  signupFunction: async ({ name, email, password, role }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        {
          name,
          email,
          password,
          role,
        },
        { withCredentials: true },
      );
      set({ user: res.data.user });
      toast.success("Account created successfully");
      console.log(res);
    } catch (error) {
      console.log("error in signup function", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  },
  fetchLoggedInUser: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/auth/me`, {
        withCredentials: true,
      });
      set({ user: res.data.user });
    } catch (error) {
      console.log("error in fetchLoggedInUser function", error);
      set({ user: null });
    }
  },
  updateProfile: async ({ name, email }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/update-profile`,
        { name, email },
        { withCredentials: true },
      );
      set({ user: res.data.user });
      toast.success("Profile updated successfully");
      return { success: true };
    } catch (error) {
      console.log("error in updateProfile", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
      return { success: false, error: error.response?.data?.message };
    }
  },
  changePassword: async ({ currentPassword, newPassword }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/change-password`,
        { currentPassword, newPassword },
        { withCredentials: true },
      );
      toast.success("Password changed successfully");
      return { success: true };
    } catch (error) {
      console.log("error in changePassword", error);
      toast.error(error.response?.data?.message || "Failed to change password");
      return { success: false, error: error.response?.data?.message };
    }
  },
  logoutFunction: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("error in logout function", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
}));
