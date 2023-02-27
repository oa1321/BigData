const express = require("express");

const router = express.Router()

const getMainPage = require("../controllers/dahboard")

router.route("/").get(getMainPage)

module.exports = router