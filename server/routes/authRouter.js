import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import {
  validateLogin,
  validateRegister,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export default router;
