import { Router } from "express";
import {
  getApplocationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", getApplocationStats);
router.patch("/update-user", validateUpdateUser, updateUser);

export default router;
