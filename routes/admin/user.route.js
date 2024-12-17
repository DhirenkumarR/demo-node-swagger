const express = require('express');
const router = express.Router();

const { createUpdateUser, getUsers, deleteUsers, getUsersList } = require('../../controller/admin/user.controller');

const validation = require('../../middleware/validation');
const { createUserValidation } = require('../../constant/validation_constant');
const { adminTokenCheck } = require('../../middleware/tokencheck');

//User APIs
router.post("/", adminTokenCheck(), validation(createUserValidation), createUpdateUser)
router.get("/", adminTokenCheck(), getUsers)
router.get("/list", adminTokenCheck(), getUsersList)
router.put("/:id", adminTokenCheck(), validation(createUserValidation), createUpdateUser);
router.get("/:id", adminTokenCheck(), getUsers);
router.delete("/:id", adminTokenCheck(), deleteUsers);

module.exports = router;
