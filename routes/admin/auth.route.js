const express = require('express');
const router = express.Router();

const { login, forgotPassword, linkExpired, resetPassword } = require('../../controller/admin/auth.controller');

const validation = require('../../middleware/validation');
const { adminLoginValidation, forgotPasswordValidation, linkExpiredValidation, resetPasswordValidation } = require('../../constant/validation_constant');

//Auth API
router.post("/login", validation(adminLoginValidation), login)
router.post("/forgot-password", validation(forgotPasswordValidation), forgotPassword)
router.post("/link-expired", validation(linkExpiredValidation), linkExpired)
router.post("/reset-password", validation(resetPasswordValidation), resetPassword)

module.exports = router;
