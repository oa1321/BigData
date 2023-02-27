async function get_top5_add(){
    return {"זייתים":30, "תירס": 20, "פטריות": 10, "אנשובי": 5, "בצל":5};
}
async function get_top5_city(){
    return {"חיפה":30, "אילת": 34, "תל אביב": 40, "יהוד": 55, "אריאל":55};
}
async function get_regins(){
    return {"חיפה":30, "דן": 34, "מרכז": 40, "צפון": 55, "דרום":55};
}
async function get_times_today(){
    return {"10:00":4, "12:00": 12, "14:00": 40, "16:00": 32, "18:00":5};
}

async function get_today_amount(){
    return 120;
}
async function get_open_orders(){
    return 30;
}
async function get_stores_amount(){
    return 18;
}
async function get_avarge(){
    return 17;
}
module.exports = {get_top5_add,
    get_top5_city,
    get_regins,
    get_times_today,
    get_today_amount,
    get_open_orders,
    get_stores_amount,
    get_avarge};