const get_main_page = async (req, res) =>{
    
    res.render('k-wd-dashboard/public/analyze.ejs');
}

module.exports = get_main_page