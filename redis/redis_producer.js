const express = require('express');
const redis = require('redis');

const app = express();
const port = 3001;
const client = redis.createClient(6379); // create a new Redis client

async function start_seq(){
    await client.connect()
}
start_seq()
// create an endpoint to generate a random value and save it to Redis
app.get('/gen', (req, res) => {
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
    res.send(`REDIS GENERATE: ${n} \norders_today set to ${orders_today}\norders_today set to ${open_orders}\norders_today set to ${open_stores}\norders_today set to ${avarage_time}\n`);
  });

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