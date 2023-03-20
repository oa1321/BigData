const redis = require('redis');

const client = redis.createClient(6379); // create a new Redis client

const { Kafka } = require('kafkajs');


//'yqgypzag'
//'XzSlY0jJ2xcQdCJN5b1v6lr1WKHN6cCf
// Set up the Kafka client
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


  // Create a Kafka consumer
const consumer = kafka.consumer({groupId: "yqgypzag-x2"})

async function data_unfinished(data){
  client.incr('open_orders')
  client.incr('orders_today')
  if(data.olives == 'Yes'){
    console.log("olives")
    client.incr('olives')
  }
  if(data.corn == 'Yes'){
    client.incr('corn')
  }
  if(data.mushrooms == 'Yes'){
    client.incr('mushrooms')
  }
  if(data.anshoby == 'Yes'){
    client.incr('anshoby')
  }
  if(data.onions == 'Yes'){
    client.incr('onions')
  }
  if(data.cheese == 'Yes'){
    client.incr('cheese')
  }
  if(data.peppers == 'Yes'){
    client.incr('peppers')
  }
  if(data.tomato == 'Yes'){
    client.incr('tomato')
  }

  if(data.pineapple == 'Yes'){
    client.incr('pineapple')
  }
  if(data.greenpeppers == 'Yes'){
    client.incr('greenpeppers')
  }
  if(data.pepperoni == 'Yes'){
    client.incr('pepperoni')
  }
  if(data.blackolives == 'Yes'){
    client.incr('blackolives')
  }
  if(data.bulgarit == 'Yes'){
    client.incr('bulgarit')
  }
  if(data.tuna == 'Yes'){
    client.incr('tuna')
  }
  if(data.cheesemix == 'Yes'){
    client.incr('cheesemix')
  }
  if(data.harifpeppers == 'Yes'){
    client.incr('harifpeppers')
  }
  const regins = ["חיפה", "דן", "מרכז", "צפון", "דרום"]; 
  if(data.area === 'Center'){
    client.incr("מרכז")
  }
  if(data.area === 'Dan'){
    client.incr("דן")
  }
  if(data.area === 'Haifa'){
    client.incr("חיפה")
  }
  if(data.area === 'North'){
    client.incr("צפון")
  }
  if(data.area === 'South'){
    client.incr("דרום")
  }

  if (data.time === '12:01'){
    client.incr('12:00')
  }
  if (data.time === '14:01'){
    client.incr('14:00')
  }
  if (data.time === '16:01'){
    client.incr('16:00')
  }
  if (data.time === '18:01'){
    client.incr('18:00')
  }
  if (data.time === '10:01'){
    client.incr('10:00')
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));
  await delay(Math.floor(Math.random() * 8000)+2000)
  data_finished(data)
}

async function data_finished(data){
  client.decr('open_orders')
  client.incrBy('avarage_time',data.fin_time)
  client.incr(data.store_name+'_time')
  client.incrBy(data.store_name, data.fin_time)
}
async function update_data(data){
  data_unfinished(data)
  console.log(`Received message:`, data)
  var d = new Date();
  var n = d.toLocaleTimeString();
  client.set('update_time', n)
}
// Consume messages from the yqgypzag-default topic
async function consumeMessages() {
  await consumer.connect()
  console.log('Consumer connected')
  await consumer.subscribe({ topic: 'yqgypzag-pizza'})
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      
      update_data(JSON.parse(message.value.toString()))
    }
  })
}

async function start_seq(){
  await client.connect()
  consumeMessages().catch(console.error)
}


start_seq()