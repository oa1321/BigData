const express = require("express");

const router = express.Router()

const f = require("../controllers/analyze")

router.route("/").get(f.get_main_page)
router.route("/:date1/:date2").get(f.get_main_page_parms)
module.exports = router