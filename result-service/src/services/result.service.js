import * as ResultRepo from "../repositories/result.repository.js";
import { CreateResultSchema } from "../validators/result.validation.js";
import ApiError from "../utils/ApiError.js";

const cleanEmptyFields = (data) => {
  const cleaned = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && !(typeof value === "string" && value.trim() === "")) {
      cleaned[key] = value;
    }
  });
  return cleaned;
};

export const createResult = async (payload) => {
  const cleaned = cleanEmptyFields(payload);
  const parsed = CreateResultSchema.safeParse(cleaned);

  if (!parsed.success) {
    throw new ApiError(400, "Validation failed", parsed.error.flatten().fieldErrors);
  }

  // Check if result already exists for this quiz and student
  const existing = await ResultRepo.findOne({
    quizId: parsed.data.quizId,
    studentId: parsed.data.studentId
  });

  if (existing) {
    throw new ApiError(409, "Result already exists for this student and quiz");
  }

  const result = await ResultRepo.createOne(parsed.data);
  return result;
};

export const getResultByQuizAndStudent = async (quizId, studentId) => {
  if (!quizId || !studentId) throw new ApiError(400, "Quiz ID and Student ID required");

  const result = await ResultRepo.findOne({ quizId, studentId });
  if (!result) throw new ApiError(404, "Not found");

  return result;
};

export const listResults = async (query) => {
  const filter = {};

  if (query.quizId) filter.quizId = query.quizId;
  if (query.studentId) filter.studentId = query.studentId;

  const options = {
    page: Number(query.page || 1),
    limit: Number(query.limit || 10),
    sortBy: query.sortBy || "createdAt",
    order: query.order || "desc",
  };

  const [data, total] = await Promise.all([
    ResultRepo.findAll(filter, options),
    ResultRepo.countDocuments(filter),
  ]);

  return {
    records: data,
    meta: {
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    },
  };
};
