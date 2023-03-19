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
  
  // Create a Kafka producer
  const producer = kafka.producer()
  const ids= {
    "Jerusalem": 1,
    "TelAviv": 2,
    "Haifa": 3,
    "RishonLeZion": 4,
    "PetahTikva": 5,
    "Ashdod": 6,
    "Netanya": 7,
    "BeerSheva": 8,
    "BneiBrak": 9,
    "Holon": 10,
    "BatYam": 11,
    "RamatGan": 12,
    "Rehovot": 13,
    "Herzliya": 14,
    "KfarSaba": 15,
    "Nahariya": 16,
    "Modi'in-Maccabim-Re'": 17
  }
const regions = {
"Haifa": ["Haifa", "Nahariya"],
"Dan": ["TelAviv", "PetahTikva", "BneiBrak", "Holon", "BatYam", "RamatGan", "Herzliya"],
"Center": ["Jerusalem", "Modi'in-Maccabim-Re'", "RishonLeZion", "Rehovot"],
"North": ["KfarSaba"],
"South": ["Ashdod", "BeerSheva", "Netanya"]
};
function getRegion(city) {
for (const [region, cities] of Object.entries(regions)) {
    if (cities.includes(city)) {
    return region;
    }
}
return null; // city not found in any region
}
// create "old data"
function generateRandomOrder(i) {
    const stores = ["Jerusalem", "TelAviv", "Haifa", "RishonLeZion",
    "PetahTikva", "Ashdod", "Netanya", "BeerSheva", "BneiBrak",
     "Holon", "BatYam", "RamatGan", "Rehovot", "Herzliya", "KfarSaba", "Nahariya", "Modi'in-Maccabim-Re'"];
    const dates = ['2023-03-11', '2023-03-12', '2023-03-13', '2023-03-14', '2023-03-15'];
    const times = ['10:01', '11:01', '12:01', '13:01', '14:01'];
    const statuses = ['In Progress', 'Delivered'];
    
    const s_name = stores[Math.floor(Math.random() * stores.length)]
    // date yyyy/mm/dd
    const order = {
      order_id: i,
      store_id: ids[s_name],
      store_name: s_name,
      area: getRegion(s_name),
      date: dates[Math.floor(Math.random() * dates.length)],
      time: times[Math.floor(Math.random() * times.length)],
      fin_time: Math.floor(Math.random() * 60),
      status: statuses[1],
      olives: Math.random() < 0.7 ? 'Yes' : 'No',
      corn: Math.random() < 0.4 ? 'Yes' : 'No',
      mushrooms: Math.random() < 0.2 ? 'Yes' : 'No',
      anshoby: Math.random() < 0.3 ? 'Yes' : 'No',
      onions: Math.random() < 0.3 ? 'Yes' : 'No',
      cheese: Math.random() < 0.5 ? 'Yes' : 'No',
      peppers: Math.random() < 0.3 ? 'Yes' : 'No',
      tomato: Math.random() < 0.6 ? 'Yes' : 'No',
    };
  
    return order;
}
function generateRandomOrderToday(i) {
    const stores = ["Jerusalem", "TelAviv", "Haifa", "RishonLeZion",
    "PetahTikva", "Ashdod", "Netanya", "BeerSheva", "BneiBrak",
     "Holon", "BatYam", "RamatGan", "Rehovot", "Herzliya", "KfarSaba", "Nahariya", "Modi'in-Maccabim-Re'"];
    const dates = ['2023-03-21'];
    const times = ['10:01', '12:01', '14:01', '16:01', '18:01', '12:01', '14:01', '18:01'];
    const statuses = ['In Progress', 'Delivered'];
    
    const s_name = stores[Math.floor(Math.random() * stores.length)]
    // date yyyy/mm/dd
    const order = {
      order_id: i,
      store_id: ids[s_name],
      store_name: s_name,
      area: getRegion(s_name),
      date: dates[Math.floor(Math.random() * dates.length)],
      time: times[Math.floor(Math.random() * times.length)],
      fin_time: Math.floor(Math.random() * 60),
      status: statuses[1],
      olives: Math.random() < 0.7 ? 'Yes' : 'No',
      corn: Math.random() < 0.4 ? 'Yes' : 'No',
      mushrooms: Math.random() < 0.2 ? 'Yes' : 'No',
      anshoby: Math.random() < 0.3 ? 'Yes' : 'No',
      onions: Math.random() < 0.3 ? 'Yes' : 'No',
      cheese: Math.random() < 0.5 ? 'Yes' : 'No',
      peppers: Math.random() < 0.3 ? 'Yes' : 'No',
      tomato: Math.random() < 0.6 ? 'Yes' : 'No',
    };
  
    return order;
}
// Produce a message to the yqgypzag-default topic
async function produceMessage() {
    await producer.connect()
    console.log('Producer connected')
    for (let i = 0; i < 2; i++) {
        const d =generateRandomOrderToday(i)
        await producer.send({
        topic: 'yqgypzag-pizza',
        messages: [
            { value: JSON.stringify(d)}
        ]
        })
        console.log('Message sent')
    }
    await producer.disconnect()
  }
  
  produceMessage().catch(console.error)