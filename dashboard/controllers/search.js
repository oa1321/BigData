const search_in_els = require('../models/search');

const get_main_page = async (req, res) =>{
    res.render('public/search.ejs');
}

const get_main_page_parms = async (req, res) =>{
    const { shop_name, date } = req.params;
    console.log("here")
    console.log(search_in_els)
    res.json(await search_in_els(shop_name,date));
}
module.exports = {get_main_page, get_main_page_parms};