const mongoose = require("mongoose");

const QuestionnaireSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  questions: [
    {
      text: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["text", "single-choice", "multiple-choice"],
        default: "text",
      },
      options: [
        {
          text: {
            type: String,
            required: true,
          },
        },
      ],
      order: {
        type: Number,
        default: 0,
      },
    },
  ],
  completions: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Questionnaire", QuestionnaireSchema);
