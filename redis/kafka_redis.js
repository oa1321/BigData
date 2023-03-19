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