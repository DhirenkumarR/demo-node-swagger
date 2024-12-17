const express = require('express');
const router = express.Router();
const { userTokenCheck } = require('../../middleware/tokencheck');

const { getStepList} = require('../../controller/v1/step.controller');
const { getQuestionList, addProfileQuestion, updateProfileQuestion } = require('../../controller/v1/question.controller');

router.get("/get-step-list",userTokenCheck(), getStepList)
router.get("/questions", userTokenCheck(), getQuestionList)
router.post("/add-profile-questions", userTokenCheck(), addProfileQuestion)
router.put("/update-profile-questions", userTokenCheck(), updateProfileQuestion)

module.exports = router;