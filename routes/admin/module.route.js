const express = require('express');
const router = express.Router();

const { createModule, getMolules } = require('../../controller/admin/module.controller');

const validation = require('../../middleware/validation');
const { modulePostValidation } = require('../../constant/validation_constant');
const { adminTokenCheck } = require('../../middleware/tokencheck');

//Auth API
router.post("/", validation(modulePostValidation), createModule)
router.get("/", adminTokenCheck(), getMolules)

module.exports = router;
