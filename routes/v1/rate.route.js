const express = require('express');
const router = express.Router();

const { createRate } = require('../../controller/v1/rate.controller');
const { userTokenCheck } = require('../../middleware/tokencheck');


//Rate API
router.post('/create', userTokenCheck(), createRate);



module.exports = router;
