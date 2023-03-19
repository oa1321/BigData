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
const consumer = kafka.consumer({groupId: "yqgypzag-x"})

// Consume messages from the yqgypzag-default topic
async function consumeMessages() {
  await consumer.connect()
  console.log('Consumer connected')
  await consumer.subscribe({ topic: 'yqgypzag-pizza'})
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message:`, 
        JSON.parse(message.value.toString()),
      )
    }
  })
}

consumeMessages().catch(console.error)