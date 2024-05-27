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

const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(validateIdParam, editJob)
  .delete(validateIdParam, deleteJob);

export default router;
