import express from "express";
import {
  addToWishlist,
  allCoupons,
  applyCoupon,
  changePassword,
  clearWishlist,
  getUserProfile,
  getWishlist,
  login,
  logout,
  register,
  removeFromWishlist,
  resetPassword,
  sendOtp,
  updateUserProfile,
  verifyOtp,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuth, getUserProfile);
router.post("/update-profile", isAuth, updateUserProfile);
router.post("/change-password", isAuth, changePassword);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.get("/all-coupons", isAuth, allCoupons);
router.post("/apply-coupon", isAuth, applyCoupon);
router.post("/add-to-wishlist", isAuth, addToWishlist);
router.post("/remove-from-wishlist", isAuth, removeFromWishlist);
router.get("/wishlist", isAuth, getWishlist);
router.get("/clear-wishlist", isAuth, clearWishlist);

export default router;
