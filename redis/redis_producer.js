const express = require('express');
const redis = require('redis');

const app = express();
const port = 3001;
const client = redis.createClient(6379); // create a new Redis client

async function start_seq(){
    await client.connect()
}
start_seq()

async function gen_ramdom_data(req,res){
  const orders_today = Math.floor(Math.random() * 300);
  const open_orders = Math.floor(Math.random() * orders_today);
  const open_stores = Math.floor(Math.random() * 30);
  const avarage_time = Math.floor(Math.random() * 40);
  client.set('orders_today', orders_today)
  client.set('open_orders', open_orders)
  client.set('open_stores', open_stores)
  client.set('avarage_time', avarage_time)
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
  RAND = 30
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
    const randomNum = Math.floor(Math.random() * 60) + 10;
    
    // Set the random number for the city using the Redis client
    client.set(city, randomNum);
    }


  //regins
  const regins = ["חיפה", "דן", "מרכז", "צפון", "דרום"]; 

  // Loop through each city name in the array
  for (const regin of regins) {
    // Generate a random number between 1 to 60
    const randomNum = Math.floor(Math.random() * 120) + 10;
    
    // Set the random number for the city using the Redis client
    client.set(regin, randomNum);
    }

   //times
   const times = ["10:00", "12:00", "14:00", "16:00", "18:00"]; 

   // Loop through each city name in the array
   for (const t of times) {
     // Generate a random number between 1 to 60
     const randomNum = Math.floor(Math.random() * 45) + 5;
     
     // Set the random number for the city using the Redis client
     client.set(t, randomNum);
     }

  res.send(`REDIS GENERATE: ${n} \norders_today set to ${orders_today}\norders_today set to ${open_orders}\norders_today set to ${open_stores}\norders_today set to ${avarage_time}\n`);
}
// create an endpoint to generate a random value and save it to Redis
app.get('/gen', (req, res) => {gen_ramdom_data(req,res)});

// create an endpoint to stop the app
app.get('/stop', (req, res) => {
  res.send('Stopping the app...');
  client.quit(); // quit the Redis client when the app is stopped
  server.close(); // stop the Express server
});

// start the Express server
const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/gen`);
});