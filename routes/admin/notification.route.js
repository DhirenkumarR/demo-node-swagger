const express = require('express');
const router = express.Router();

const { createNotifications, getNotifications, getNotificationDetails } = require('../../controller/admin/notification.controller');

const validation = require('../../middleware/validation');
const { notificationCreateValidation } = require('../../constant/validation_constant');
const { adminTokenCheck } = require('../../middleware/tokencheck');

//Notification APIs
router.get('/:id', adminTokenCheck(), getNotificationDetails)
router.post("/", adminTokenCheck(), validation(notificationCreateValidation), createNotifications)
router.get("/", adminTokenCheck(), getNotifications)

module.exports = router;
