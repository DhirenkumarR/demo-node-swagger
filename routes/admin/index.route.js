const express = require('express');
const router = express.Router();

const AdminRoute = require("./admin.route")
const AuthRoute = require("./auth.route")
const ModuleRoute = require("./module.route")
const RoleRoute = require("./role.route")
const StaffRoute = require("./staff.route");
const CMSRoute = require("./cms.route");
const MasterRoute = require("./master.route");
const UserRoute = require("./user.route");
const ContactRequestRoute = require("./contact_request.route");
const BlockUserRoute = require("./block_user.route");
const QuestionRoute = require("./question.route");
const NotificationRoute = require("./notification.route");


router.use("/", AdminRoute)
router.use("/auth", AuthRoute)
router.use("/module", ModuleRoute)
router.use("/role", RoleRoute)
router.use("/staff", StaffRoute)
router.use("/cms", CMSRoute)
router.use("/master", MasterRoute)
router.use("/user/block", BlockUserRoute)
router.use("/user", UserRoute)
router.use("/contact-request", ContactRequestRoute)
router.use("/question", QuestionRoute)
router.use("/notification", NotificationRoute)

module.exports = router
