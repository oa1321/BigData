const kafka = require('kafka-node');

const client = new kafka.KafkaClient({
  kafkaHost: 'your-hostname.cloudkarafka.com:9094',
  saslUsername: 'your-username',
  saslPassword: 'your-password',
  ssl: true
});

const producer = new kafka.Producer(client);

producer.on('ready', function () {
  console.log('Producer is ready');
});

producer.on('error', function (err) {
  console.error('Error connecting to Kafka:', err);
});