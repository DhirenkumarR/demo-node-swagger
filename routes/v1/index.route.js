const express = require('express');
const router = express.Router();

const AuthRoute = require("./auth.route")
const contactRoute = require("./contact.route")
const contactUsRoute = require("./contact_us.route")
const stepRoute = require("./step.route")
const reportRoute = require("./report.route")
const homeRoute = require("./home.route")
const rateRoute = require("./rate.route")

router.use("/auth", AuthRoute)
router.use("/contact", contactRoute)
router.use("/rate", rateRoute)
router.use("/contact-us", contactUsRoute)
router.use("/step", stepRoute)
router.use("/report", reportRoute)
router.use("/home", homeRoute)

module.exports = router
