import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  validateLogin,
  validateRegister,
} from "../middleware/validationMiddleware.js";
import rateLimiter from "express-rate-limit";

const router = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { message: "IP rate limit exceeded, retry in 15 minutes" },
});

router.post("/register", apiLimiter, validateRegister, register);
router.post("/login", apiLimiter, validateLogin, login);
router.get("/logout", logout);

export default router;
