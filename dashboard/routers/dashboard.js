const express = require("express");

const router = express.Router()

const f = require("../controllers/dahboard")

router.route("/").get(f.get_main_page)
router.route("/refrash").get(f.get_main_page_json)
module.exports = router