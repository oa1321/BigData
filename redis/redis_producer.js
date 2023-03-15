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
    const randomValue = Math.floor(Math.random() * 100);
    client.set('x', randomValue)
    res.send(`REDIS GENERATE: Value set to ${randomValue}`);
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