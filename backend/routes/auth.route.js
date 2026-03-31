import express from "express";
import { changePassword, getUserProfile, login, logout, register, resetPassword, sendOtp, updateUserProfile, verifyOtp } from "../controllers/auth.controller.js";
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
router.post("/reset-password",resetPassword);
export default router;