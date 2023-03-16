
const {
    gen_ramdom_data,
} = require('../models/redis');
const get_main_page = async (req, res) =>{
    redis_data = await gen_ramdom_data()
    res.render('index.ejs', redis_data);
}

module.exports = get_main_page