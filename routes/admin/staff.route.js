const express = require('express');
const router = express.Router();

const { createUpdateStaff, getStaff, deleteStaff } = require('../../controller/admin/staff.controller');

const validation = require('../../middleware/validation');
const { createStaffValidation } = require('../../constant/validation_constant');
const { adminTokenCheck } = require('../../middleware/tokencheck');

router.post("/", adminTokenCheck(),validation(createStaffValidation), createUpdateStaff)
router.put("/:id", adminTokenCheck(), createUpdateStaff)
router.get("/", adminTokenCheck(), getStaff)
router.get("/:id", adminTokenCheck(), getStaff)
router.delete("/:id", adminTokenCheck(), deleteStaff)

module.exports = router;
