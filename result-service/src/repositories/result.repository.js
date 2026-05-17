import ResultModel from "../models/result.model.js";

export const createOne = async (data) => {
  return await ResultModel.create(data);
};

export const findByStudentId = async (studentId) => {
  return await ResultModel.find({ studentId }).populate("quizId");
};

export const findByQuizId = async (quizId) => {
  return await ResultModel.find({ quizId }).populate("studentId");
};

export const findOne = async (filter) => {
  return await ResultModel.findOne(filter);
};

export const findAll = async (filter, options) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = options;

  const skip = (Number(page) - 1) * Number(limit);
  const sortOrder = order === "asc" ? 1 : -1;

  return await ResultModel.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(Number(limit))
    .populate("quizId")
    .populate("studentId");
};

export const countDocuments = async (filter) => {
  return await ResultModel.countDocuments(filter);
};