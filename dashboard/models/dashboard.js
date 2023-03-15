const redis = require('redis');
const client = redis.createClient(6379); // create a new Redis client

async function start_seq(){
    await client.connect()
}
start_seq()
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
    x = client.get("orders_today")
    return x;
}
async function get_open_orders(){
    x = client.get("open_orders")
    return x;
}
async function get_stores_amount(){
    x = client.get("open_stores")
    return x;
}
async function get_avarge(){
    x = client.get("avarage_time")
    return x;
}
async function get_update_time(){
    x = client.get("update_time")
    return x;
}
module.exports = {get_top5_add,
    get_top5_city,
    get_regins,
    get_times_today,
    get_today_amount,
    get_open_orders,
    get_stores_amount,
    get_avarge,
    get_update_time};