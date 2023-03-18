const express = require("express");

const router = express.Router()

const f = require("../controllers/search")
router.route("/").get(f.get_main_page)

router.route("/:shop_name/:date").get(f.get_main_page_parms)

module.exports = router