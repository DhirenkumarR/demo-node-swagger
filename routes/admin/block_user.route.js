const express = require('express');
const router = express.Router();

const { addBlockUser, getBlockUsers, updateBlockUserReason, deleteBlockUser } = require('../../controller/admin/block_user.controller');

const { adminTokenCheck } = require('../../middleware/tokencheck');
const validation = require('../../middleware/validation');
const { addBlockUserValidation } = require('../../constant/validation_constant');

//Block User API
router.post("/:userId", adminTokenCheck(), validation(addBlockUserValidation), addBlockUser)
router.get("/:userId", adminTokenCheck(), getBlockUsers)
router.put("/:userId", adminTokenCheck(), updateBlockUserReason)
router.delete("/:userId", adminTokenCheck(), deleteBlockUser)

module.exports = router;
