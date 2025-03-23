const express = require("express");
const router = express.Router();
const {
  createResponse,
  getResponses,
} = require("../controllers/responseController");

router.post("/", createResponse);

router.get("/questionnaire/:questionnaireId", getResponses);

module.exports = router;
