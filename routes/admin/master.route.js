const express = require('express');
const router = express.Router();

const { getGender, getHobbies, getRelationship, getSexualOrientation } = require('../../controller/admin/master.controller');

const { adminTokenCheck } = require('../../middleware/tokencheck');

router.get("/gender", adminTokenCheck(), getGender)
router.get("/hobbies", adminTokenCheck(), getHobbies)
router.get("/relationship", adminTokenCheck(), getRelationship)
router.get("/sexual-orientation", adminTokenCheck(), getSexualOrientation)

module.exports = router;
