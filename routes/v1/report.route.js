const express = require('express');
const router = express.Router();
const { userTokenCheck } = require('../../middleware/tokencheck');
const {report} = require('../../controller/v1/report.controller');

router.post("/create-report", userTokenCheck(), report);

module.exports = router;