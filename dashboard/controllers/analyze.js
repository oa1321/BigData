const analyze_bigml = require('../models/analyze');
const get_mongo = require('../models/mongo_create')

const get_main_page = async (req, res) =>{
    
    res.render('public/analyze.ejs');
}
const get_main_page_parms = async (req, res) =>{
    const { date1, date2 } = req.params;
    console.log("here2")
    console.log(analyze_bigml)
    //shood use the dates to create data.csv
    console.log(date2, date1)
    await get_mongo(date2, date1)
    //in models i shood create a mongodb readr that saves the data to data.csv
    res.json(await analyze_bigml());
}
module.exports = {get_main_page, get_main_page_parms};