import express from "express";
import {
  assignCouponToUser,
  deleteOrder,
  deleteUser,
  getAllUsers,
  removeCouponFromUser,
  updateOrderStatus,
  updateUserRole,
} from "../controllers/admin.controller.js";
const router = express.Router();
import { isAuth } from "../middleware/isAuth.js";

router.get("/get-all-users", isAuth, getAllUsers);
router.delete("/delete-user/:id", isAuth, deleteUser);
router.put("/update-user-role/:id", isAuth, updateUserRole);
router.post("/assign-coupon/:id",isAuth,assignCouponToUser);
router.post("/remove-coupon/:id",isAuth,removeCouponFromUser);
// router.put("/update-order-status/:id", isAuth, updateOrderStatus);
// router.delete("/delete-order/:id", isAuth, deleteOrder);

export default router;
