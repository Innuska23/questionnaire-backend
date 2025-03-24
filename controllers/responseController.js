const Response = require("../models/Response");
const Questionnaire = require("../models/Questionnaire");

exports.createResponse = async (req, res) => {
  try {
    const newResponse = new Response(req.body);
    const savedResponse = await newResponse.save();

    await Questionnaire.findByIdAndUpdate(req.body.questionnaireId, {
      $inc: { completions: 1 },
    });

    res.status(201).json(savedResponse);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

exports.getResponses = async (req, res) => {
  try {
    const responses = await Response.find({
      questionnaireId: req.params.questionnaireId,
    }).sort({ completedAt: -1 });

    res.json(responses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
