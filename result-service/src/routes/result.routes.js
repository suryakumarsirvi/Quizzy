import express from "express";

import {
  createResultController,
  getResultByQuizAndStudentController,
  listResultsController,
} from "../controllers/result.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

import { CreateResultSchema } from "../validators/result.validation.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin", "teacher", "student"),
  validate(CreateResultSchema),
  createResultController
);

router.get(
  "/:quizId/:studentId",
  authenticate,
  authorize("admin", "teacher", "student"),
  getResultByQuizAndStudentController
);

router.get(
  "/",
  authenticate,
  authorize("admin", "teacher", "student"),
  listResultsController
);

export default router;
