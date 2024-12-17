const express = require('express');
const router = express.Router();

const { userList, blockUsers, addContact, getContactList, unblockUser } = require('../../controller/v1/contact.controller');
const { userTokenCheck } = require('../../middleware/tokencheck');


//User API
router.post("/list", userTokenCheck(), userList)
router.post('/block', userTokenCheck(), blockUsers);
router.post('/unblock', userTokenCheck(), unblockUser);
router.post('/add-contact', userTokenCheck(), addContact);
router.get("/contact-list", userTokenCheck(), getContactList)


module.exports = router;
