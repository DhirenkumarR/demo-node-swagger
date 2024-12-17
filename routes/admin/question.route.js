const express = require('express');
const router = express.Router();

const { addUpdateQuestion, getQuestion, deleteQuestion } = require('../../controller/admin/question.controller');

const validation = require('../../middleware/validation');
const { addQuestionValidation } = require('../../constant/validation_constant');
const { adminTokenCheck } = require('../../middleware/tokencheck');

router.post("/", adminTokenCheck(), validation(addQuestionValidation), addUpdateQuestion)
router.put("/:id", adminTokenCheck(), addUpdateQuestion)
router.get("/", adminTokenCheck(), getQuestion)
router.get("/:id", adminTokenCheck(), getQuestion)
router.delete("/:id", adminTokenCheck(), deleteQuestion)

module.exports = router;
