const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  questionnaireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questionnaire",
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      answer: mongoose.Schema.Types.Mixed,
    },
  ],
  completionTime: {
    type: Number,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Response", ResponseSchema);
