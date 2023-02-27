const express = require("express");

const router = express.Router()

const getMainPage = require("../controllers/analyze")

router.route("/").get(getMainPage)

module.exports = router