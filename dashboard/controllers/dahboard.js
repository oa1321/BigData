
const {
    get_top5_add,
    get_top5_city,
    get_regins,
    get_times_today,
    get_today_amount,
    get_open_orders,
    get_stores_amount,
    get_avarge,
    get_update_time

} = require('../models/dashboard');
const get_main_page = async (req, res) =>{
    const t5a = await get_top5_add()
    const t5r = await get_regins()
    const t5c = await get_top5_city()
    const t2d = await get_times_today()
    const a_o = await get_today_amount()
    const u_o = await get_open_orders()
    const a_t = await get_avarge()
    const o_s = await get_stores_amount()
    const t = await get_update_time();
    res.render('public/index.ejs', {top5_adds: t5a,
                                                    orders_by_area: t5r,
                                                    top5_lowest_time: t5c,
                                                    orders_by_time: t2d,
                                                    all_orders: a_o,
                                                    unfinished: u_o,
                                                    avarege: a_t,
                                                    open_stores: o_s,
                                                    time_now: t

    });
}

module.exports = get_main_page