const express = require('express');
const router = express.Router();
const { userTokenCheck } = require('../../middleware/tokencheck');
const { createContact } = require('../../controller/v1/contact_us.controller');


//Contact us API
router.post("/", createContact)


module.exports = router;
