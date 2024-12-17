const express = require('express');
const router = express.Router();
const { userTokenCheck } = require('../../middleware/tokencheck');
const { homeUserList } = require('../../controller/v1/home.controller');

router.get("/home-user-list", userTokenCheck(), homeUserList)

module.exports = router;