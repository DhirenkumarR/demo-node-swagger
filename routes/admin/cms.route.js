const express = require('express');
const router = express.Router();

const { addUpdateCms, getCms, deleteCms } = require('../../controller/admin/cms.controller');

const validation = require('../../middleware/validation');
const { cmsValidation } = require('../../constant/validation_constant');
const { adminTokenCheck } = require('../../middleware/tokencheck');

router.post("/", adminTokenCheck(), validation(cmsValidation), addUpdateCms)
router.put("/:id", adminTokenCheck(), addUpdateCms)
router.get("/", adminTokenCheck(), getCms)
router.get("/:id", adminTokenCheck(), getCms)
router.delete("/:id", adminTokenCheck(), deleteCms)

module.exports = router;
