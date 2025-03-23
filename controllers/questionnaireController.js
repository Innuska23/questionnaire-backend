const Questionnaire = require("../models/Questionnaire");

exports.getQuestionnaires = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const questionnaires = await Questionnaire.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Questionnaire.countDocuments();

    res.json({
      questionnaires,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

exports.getQuestionnaire = async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id);

    if (!questionnaire) {
      return res.status(404).json({ message: "Опитування не знайдено" });
    }

    res.json(questionnaire);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка сервера" });
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
      return res.status(404).json({ message: "Опитування не знайдено" });
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
      return res.status(404).json({ message: "Опитування не знайдено" });
    }

    res.json({ message: "Опитування видалено" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка сервера" });
  }
};
