const Questionnaire = require("../models/Questionnaire");

exports.getQuestionnaires = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || "createdAt";

    const total = await Questionnaire.countDocuments();

    if (sortBy === "questions") {
      const questionnaires = await Questionnaire.aggregate([
        {
          $addFields: {
            questionsCount: {
              $cond: {
                if: { $isArray: "$questions" },
                then: { $size: "$questions" },
                else: 0,
              },
            },
          },
        },
        { $sort: { questionsCount: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]);

      return res.json({
        questionnaires,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      });
    }

    let sortStage = {};
    if (sortBy === "name") sortStage = { name: 1 };
    else if (sortBy === "completions") sortStage = { completions: -1 };
    else sortStage = { createdAt: -1 };

    const questionnaires = await Questionnaire.find()
      .sort(sortStage)
      .skip(skip)
      .limit(limit);

    res.json({
      questionnaires,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("❌ Error in getQuestionnaires:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQuestionnaire = async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id);

    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    res.json(questionnaire);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createQuestionnaire = async (req, res) => {
  try {
    const newQuestionnaire = new Questionnaire(req.body);
    const savedQuestionnaire = await newQuestionnaire.save();

    res.status(201).json(savedQuestionnaire);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

exports.updateQuestionnaire = async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    res.json(questionnaire);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

exports.deleteQuestionnaire = async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findByIdAndDelete(req.params.id);

    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    res.json({ message: "Questionnaire deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
