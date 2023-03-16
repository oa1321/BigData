const express = require("express");

const router = express.Router()

const getMainPage = require("../controllers/redis_controller")

router.route("/").get(getMainPage)

module.exports = router