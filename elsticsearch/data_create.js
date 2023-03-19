'use strict'

const { Client } = require('es7')
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
  connectionTimeout: 60000
})
const client = new Client({
    node: " http://localhost:9200"
})
client.info({}, {}, (err, result)=>{
    if(err) {return console.error(err)}
    console.log(result.body)
})
// Upload the data to Elasticsearch
async function uploadData(data) {
  await client.index({
    index: 'pizza-data-v5',
    body: data,
  });
  console.log('Data uploaded to Elasticsearch');
}

// Create a Kafka consumer
const consumer = kafka.consumer({groupId: "yqgypzag-x"})

// Consume messages from the yqgypzag-default topic
async function consumeMessages() {
  await consumer.connect()
  console.log('Consumer connected')
  await consumer.subscribe({ topic: 'yqgypzag-pizza'})
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message:`,JSON.parse(message.value.toString()))
      if (JSON.parse(message.value.toString()).status === 'Delivered'){
         uploadData(JSON.parse(message.value.toString()));
      }
    }
  })
}

consumeMessages().catch(console.error)