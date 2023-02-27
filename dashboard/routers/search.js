const express = require("express");

const router = express.Router()

const getMainPage = require("../controllers/search")

router.route("/").get(getMainPage)

module.exports = router