const express = require("express");
const openaiController = require("../controllers/openaiControllers");
const router = express.Router();

router.post("/", openaiController.getOpenAiQuestions);

module.exports = router;
