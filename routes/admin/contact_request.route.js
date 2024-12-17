const express = require('express');
const router = express.Router();

const { getContacts, deleteContact } = require('../../controller/admin/contact_request.controller');

const { adminTokenCheck } = require('../../middleware/tokencheck');

router.get("/:id", adminTokenCheck(), getContacts)
router.delete("/:id", adminTokenCheck(), deleteContact)
router.get("/", adminTokenCheck(), getContacts)

module.exports = router;
