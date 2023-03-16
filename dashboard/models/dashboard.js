const redis = require('redis');
const client = redis.createClient(6379); // create a new Redis client

async function start_seq(){
    await client.connect()
}
start_seq()
async function get_top5_add(){
    //lets assume we have 8 kinds of toppings
    //olives
    //corn
    //mushrooms
    //anshoby
    //onions
    //cheese
    //peppers
    //tomato
    
    const top1 = await client.get('olives')
    const top2 = await client.get('corn')
    const top3 = await client.get('mushrooms')
    const top4 = await client.get('anshoby')
    const top5 = await client.get('onions')
    const top6 = await client.get('cheese')
    const top7 = await client.get('peppers')
    const top8 = await client.get('tomato')
    tops = [[top1,'olives'],[top2,'corn'],[top3,'mushrooms'],[top4,'anshoby'],[top5,'onions'],[top6,'cheese'],[top7,'peppers'],[top8,'tomato']]
    tops.sort((a, b) => { 
        
    if (parseInt(a[0]) > parseInt(b[0]) ){
        return -1
    }
    if (parseInt(a[0]) < parseInt(b[0]) ){
        return 1
    }
    return 0 
    } )
    var dict = {}
    dict[tops[0][1]] = tops[0][0]
    dict[tops[1][1]] = tops[1][0]
    dict[tops[2][1]] = tops[2][0]
    dict[tops[3][1]] = tops[3][0]
    dict[tops[4][1]] = tops[4][0]
    return dict;
}
async function get_top5_city(){
    const cities = ["Jerusalem", "TelAviv", "Haifa", "RishonLeZion",
     "PetahTikva", "Ashdod", "Netanya", "BeerSheva", "BneiBrak",
      "Holon", "BatYam", "RamatGan", "Rehovot", "Herzliya", "KfarSaba", "Nahariya", "Modi'in-Maccabim-Re'"]; 
    // Define an empty array to store the city-value pairs
    const cityValues = [];

    // Loop through each city name in the array
    for (const city of cities) {
        // Get the value for the city using the Redis client
        var x = await client.get(city);
        // Push the city-value pair to the array
        cityValues.push([city, x]);
    }
    // Sort the array by the second value in the pair (ascending order)
    cityValues.sort((a, b) => parseInt(a[1]) - parseInt(b[1]));
    // Define an empty object to store the city-value pairs
    const lowestCityValues = {};

    // Loop through the first 5 elements in the sorted cityValues array
    for (let i = 0; i < Math.min(5, cityValues.length); i++) {
    // Get the city name and value from the current element
    const [city, value] = cityValues[i];
    
    // Add the city-value pair to the lowestCityValues object
    lowestCityValues[city] = value.toString();
    }
    // Print the lowestCityValues object to the console
    return lowestCityValues;
}
async function get_regins(){
    x1 = await client.get("חיפה")
    x2 = await client.get("דן")
    x3 = await client.get("מרכז")
    x4 = await client.get("צפון")
    x5 = await client.get("דרום")
    return {"חיפה":parseInt(x1),
     "דן": parseInt(x2),
      "מרכז":parseInt(x3),
       "צפון": parseInt(x4),
        "דרום": parseInt(x5)};
}
async function get_times_today(){
    x1 = await client.get("10:00")
    x2 = await client.get("12:00")
    x3 = await client.get("14:00")
    x4 = await client.get("16:00")
    x5 = await client.get("18:00")
    return {"10:00":parseInt(x1),
     "12:00": parseInt(x2),
      "14:00":parseInt(x3),
       "16:00": parseInt(x4),
        "18:00": parseInt(x5)};
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