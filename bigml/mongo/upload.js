const mongoose = require('mongoose');
const scheme = mongoose.Schema;
const { Kafka } = require('kafkajs');


const username = 'ofek'
const password = 'ofek1234'
const uri = `mongodb+srv://${username}:${password}@cluster0.aj8giej.mongodb.net/pizza-net?retryWrites=true&w=majority`

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['dory.srvs.cloudkafka.com:9094'],
  ssl: true,
  sasl: {
    mechanism: 'SCRAM-SHA-512',
    username: 'yqgypzag',
    password: 'XzSlY0jJ2xcQdCJN5b1v6lr1WKHN6cCf'
  },
  connectionTimeout: 30000
})
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Create a Kafka consumer
const consumer = kafka.consumer({groupId: "yqgypzag-x3"})

const orderSchema = new mongoose.Schema({
  toppings: [String],
  date: { type: Date, default: Date.now}
});
const Order = mongoose.model('Order', orderSchema);
// Consume messages from the yqgypzag-default topic
async function consumeMessages() {
  await consumer.connect()
  console.log('Consumer connected')
  await consumer.subscribe({ topic: 'yqgypzag-pizza'})
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message:`)
      const data = JSON.parse(message.value.toString())
      var list1 = []
      if(data.olives == 'Yes'){

        list1.push('olives')
      }
      if(data.corn == 'Yes'){
        list1.push('corn')
      }
      if(data.mushrooms == 'Yes'){
        list1.push('mushrooms')
      }
      if(data.anshoby == 'Yes'){
        list1.push('anshoby')
      }
      if(data.onions == 'Yes'){
        list1.push('onions')
      }
      if(data.cheese == 'Yes'){
        list1.push('cheese')
      }
      if(data.peppers == 'Yes'){
        list1.push('peppers')
      }
      if(data.tomato == 'Yes'){
        list1.push('tomato')
      }
      let dateString = data.date;
    let dateParts = dateString.split("-");
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]) - 1; // subtract 1 because month is zero-indexed in Date object
    let day = parseInt(dateParts[2]);
    let date2 = new Date(year, month, day);
    console.log(list1, date2)
      const newOrder = new Order({
            toppings: list1,
            date: date2
      });
    
      newOrder.save()
      .then(() => console.log('Order saved to MongoDB'))
      .catch((err) => console.error('Error saving order to MongoDB', err));
    }
  })
}

consumeMessages().catch(console.error)

  