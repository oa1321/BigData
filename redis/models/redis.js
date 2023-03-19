const redis = require('redis');

const client = redis.createClient(6379); // create a new Redis client

async function gen_ramdom_data(req,res){
    async function start_seq(){
        await client.connect()
    }
  await start_seq()
  const orders_today = Math.floor(Math.random() * 300);
  const open_orders = Math.floor(Math.random() * orders_today);
  const open_stores = Math.floor(Math.random() * 30);
  const avarage_time = Math.floor(Math.random() * 40);
  client.set('orders_today', 0)
  client.set('open_orders', 0)
  client.set('open_stores', 17)
  client.set('avarage_time', 0)
  var d = new Date();
  var n = d.toLocaleTimeString();
  client.set('update_time', n)

  //sets tops amount
  //lets assume we have 8 kinds of toppings
  //olives
  //corn
  //mushrooms
  //anshoby
  //onions
  //cheese
  //peppers
  //tomato
  RAND = 0
  client.set('olives', Math.floor(Math.random() * RAND))
  client.set('corn', Math.floor(Math.random() * RAND))
  client.set('mushrooms', Math.floor(Math.random() * RAND))
  client.set('anshoby', Math.floor(Math.random() * RAND))
  client.set('onions', Math.floor(Math.random() * RAND))
  client.set('cheese', Math.floor(Math.random() * RAND))
  client.set('cheese', Math.floor(Math.random() * RAND))
  client.set('peppers', Math.floor(Math.random() * RAND))
  client.set('tomato', Math.floor(Math.random() * RAND))


  // cities
  const cities = ["Jerusalem", "TelAviv", "Haifa", "RishonLeZion",
  "PetahTikva", "Ashdod", "Netanya", "BeerSheva", "BneiBrak",
   "Holon", "BatYam", "RamatGan", "Rehovot", "Herzliya", "KfarSaba", "Nahariya", "Modi'in-Maccabim-Re'"]; 

  // Loop through each city name in the array
  for (const city of cities) {
    // Generate a random number between 1 to 60
    const randomNum = 0;
    
    // Set the random number for the city using the Redis client
    client.set(city, randomNum);
    client.set(city+'_time', randomNum);
    }


  //regins
  const regins = ["חיפה", "דן", "מרכז", "צפון", "דרום"]; 

  // Loop through each city name in the array
  for (const regin of regins) {
    // Generate a random number between 1 to 60
    const randomNum =0 ;
    
    // Set the random number for the city using the Redis client
    client.set(regin, 0);
    }

   //times
   const times = ["10:00", "12:00", "14:00", "16:00", "18:00"]; 

   // Loop through each city name in the array
   for (const t of times) {
     // Generate a random number between 1 to 60
     const randomNum = Math.floor(Math.random() * 45) + 5;
     
     // Set the random number for the city using the Redis client
     client.set(t, 0);
     }
     const delay = ms => new Promise(res => setTimeout(res, ms));
     async function get_redis_data() {
        // get data from redis
        const orders_today = await client.get('orders_today');
        const open_orders = await client.get('open_orders');
        const open_stores = await client.get('open_stores');
        const avarage_time = await client.get('avarage_time');
        const update_time = await client.get('update_time');
        const olives = await client.get('olives');
        const corn = await client.get('corn');
        const mushrooms = await client.get('mushrooms');
        const anshoby = await client.get('anshoby');
        const onions = await client.get('onions');
        const cheese = await client.get('cheese');
        const peppers = await client.get('peppers');
        const tomato = await client.get('tomato');
        const cities = [
          'Jerusalem', 'TelAviv', 'Haifa', 'RishonLeZion', 'PetahTikva', 'Ashdod',
          'Netanya', 'BeerSheva', 'BneiBrak', 'Holon', 'BatYam', 'RamatGan',
          'Rehovot', 'Herzliya', 'KfarSaba', 'Nahariya', "Modi'in-Maccabim-Re'"
        ];
        const cities_data = {};
        for (const city of cities) {
          const val = await client.get(city);
          cities_data[city] = val;
        }
        const regins = ['חיפה', 'דן', 'מרכז', 'צפון', 'דרום'];
        const regins_data = {};
        for (const regin of regins) {
          const val = await client.get(regin);
          regins_data[regin] = val;
        }
        const times = ['10:00', '12:00', '14:00', '16:00', '18:00'];
        const times_data = {};
        for (const t of times) {
          const val = await client.get(t);
          times_data[t] = val;
        }
        // create a data object and return it
        const data = {
          orders_today,
          open_orders,
          open_stores,
          avarage_time,
          update_time,
          olives,
          corn,
          mushrooms,
          anshoby,
          onions,
          cheese,
          peppers,
          tomato,
          cities_data,
          regins_data,
          times_data
        };
        return data;
      }
     data_to_ret =await get_redis_data()
     delay(1000)
     client.quit()
     console.log(data_to_ret)
     return data_to_ret
     
}

module.exports = {gen_ramdom_data}