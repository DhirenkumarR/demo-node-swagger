const express = require('express');
const router = express.Router();

const { login, updateProfile, logoutAccount, deleteAccount, addBio, addHobbies } = require('../../controller/v1/auth.controller');

const validation = require('../../middleware/validation');
const { loginValidation } = require('../../constant/validation_constant');
const { userTokenCheck } = require('../../middleware/tokencheck');
const upload = require('../../middleware/multerConfig');

//Auth API
router.post("/login", validation(loginValidation), login)
router.post("/add-bio",userTokenCheck(), addBio)
router.post("/add-hobbies",userTokenCheck(), addHobbies)
router.put("/update-profile", userTokenCheck(), upload.fields([
    {name: "user_image", maxCount: 5},
    {name: "user_video", maxCount: 5}
]), updateProfile)
router.delete("/logout", userTokenCheck(), logoutAccount)
router.delete("/delete-account", userTokenCheck(), deleteAccount)

module.exports = router;
