import * as ResultService from "../services/result.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createResultController = asyncHandler(async (req, res) => {
  const result = await ResultService.createResult(req.body);
  return successResponse(res, "Result created successfully", result);
});

export const getResultByQuizAndStudentController = asyncHandler(async (req, res) => {
  const { quizId, studentId } = req.params;
  const result = await ResultService.getResultByQuizAndStudent(quizId, studentId);
  return successResponse(res, "Result retrieved successfully", result);
});

export const listResultsController = asyncHandler(async (req, res) => {
  const result = await ResultService.listResults(req.query);
  return successResponse(res, "Results retrieved successfully", result);
});
