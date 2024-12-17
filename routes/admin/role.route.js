const express = require('express');
const router = express.Router();

const { createUpdateRole, getRole, deleteRole, getRoleList } = require('../../controller/admin/role.controller');

const validation = require('../../middleware/validation');
const { createRoleValidation } = require('../../constant/validation_constant');
const { adminTokenCheck } = require('../../middleware/tokencheck');

//Role API
router.post("/", adminTokenCheck(), validation(createRoleValidation), createUpdateRole)
router.get("/list", adminTokenCheck(), getRoleList)
router.put("/:id", adminTokenCheck(), createUpdateRole)
router.get("/", adminTokenCheck(), getRole)
router.get("/:id", adminTokenCheck(), getRole)
router.delete("/:id", adminTokenCheck(), deleteRole)

module.exports = router;
