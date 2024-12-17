const express = require('express');
const router = express.Router();

const { getAdmin, updateAdmin, changePassword, getPermission } = require('../../controller/admin/admin.controller');

const validation = require('../../middleware/validation');
const { changePasswordValidation } = require('../../constant/validation_constant');
const { adminTokenCheck } = require('../../middleware/tokencheck');
const upload = require('../../middleware/multerConfig');

//Admin API
router.get("/profile", adminTokenCheck(), getAdmin)
router.post("/profile/update", adminTokenCheck(), upload.single("admin_image"), updateAdmin)
router.post("/change-password", adminTokenCheck(), validation(changePasswordValidation), changePassword)
router.get("/permission", adminTokenCheck(), getPermission)

module.exports = router;
