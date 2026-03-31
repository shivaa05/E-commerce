import express from "express";
import {
  deleteOrder,
  deleteUser,
  getAllUsers,
  updateOrderStatus,
  updateUserRole,
} from "../controllers/admin.controller.js";
const router = express.Router();
import { isAuth } from "../middleware/isAuth.js";

router.get("/get-all-users", isAuth, getAllUsers);
router.delete("/delete-user/:id", isAuth, deleteUser);
router.put("/update-user-role/:id", isAuth, updateUserRole);
// router.put("/update-order-status/:id", isAuth, updateOrderStatus);
// router.delete("/delete-order/:id", isAuth, deleteOrder);

export default router;
