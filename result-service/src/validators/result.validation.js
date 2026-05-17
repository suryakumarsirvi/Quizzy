import * as z from "zod";

export const CreateResultSchema = z.object({
  quizId: z.string().min(1, "Quiz ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
  score: z.number().min(0).default(0),
  totalQuestions: z.number().min(1, "Total questions is required"),
  correctAnswers: z.number().min(0).default(0),
  wrongAnswers: z.number().min(0).default(0),
  skippedAnswers: z.number().min(0).default(0),
  accuracy: z.number().min(0).max(100).default(0),
  percentile: z.number().min(0).max(100).default(0),
  rank: z.number().min(0).default(0),
  totalTimeSpentInSeconds: z.number().min(0).default(0),
});

export const UpdateResultSchema = z.object({
  score: z.number().min(0).optional(),
  correctAnswers: z.number().min(0).optional(),
  wrongAnswers: z.number().min(0).optional(),
  skippedAnswers: z.number().min(0).optional(),
  accuracy: z.number().min(0).max(100).optional(),
  percentile: z.number().min(0).max(100).optional(),
  rank: z.number().min(0).optional(),
  totalTimeSpentInSeconds: z.number().min(0).optional(),
});
