const analyze_bigml = require('../models/analyze');


const get_main_page = async (req, res) =>{
    
    res.render('public/analyze.ejs');
}
const get_main_page_parms = async (req, res) =>{
    const { date1, date2 } = req.params;
    console.log("here")
    console.log(analyze_bigml)
    //shood use the dates to create data.csv
    res.json(await analyze_bigml());
}
module.exports = {get_main_page, get_main_page_parms};