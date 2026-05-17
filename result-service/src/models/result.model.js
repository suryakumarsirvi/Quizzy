import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "quizzes",
            required: true,
            index: true
        },

        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            index: true
        },

        score: {
            type: Number,
            default: 0
        },

        totalQuestions: {
            type: Number,
            required: true
        },

        correctAnswers: {
            type: Number,
            default: 0
        },

        wrongAnswers: {
            type: Number,
            default: 0
        },

        skippedAnswers: {
            type: Number,
            default: 0
        },

        accuracy: {
            type: Number,
            default: 0
        },

        percentile: {
            type: Number,
            default: 0
        },

        rank: {
            type: Number,
            default: 0
        },

        totalTimeSpentInSeconds: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

resultSchema.index(
    {
        quizId: 1,
        studentId: 1
    },
    {
        unique: true
    }
);

const ResultModel = mongoose.model(
    "results",
    resultSchema
);

export default ResultModel;