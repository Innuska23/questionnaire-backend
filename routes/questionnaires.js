const express = require("express");
const router = express.Router();
const {
  getQuestionnaires,
  getQuestionnaire,
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
} = require("../controllers/questionnaireController");

router.get("/", getQuestionnaires);

router.get("/:id", getQuestionnaire);

router.post("/", createQuestionnaire);

router.put("/:id", updateQuestionnaire);

router.delete("/:id", deleteQuestionnaire);

module.exports = router;
