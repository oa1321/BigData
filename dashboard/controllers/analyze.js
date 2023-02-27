const get_main_page = async (req, res) =>{
    
    res.render('public/analyze.ejs');
}

module.exports = get_main_page