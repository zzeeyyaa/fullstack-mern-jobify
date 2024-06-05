import { Router } from "express";
import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getJob,
} from "../controllers/jobController.js";
import {
  validateIdParam,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateIdParam, editJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
