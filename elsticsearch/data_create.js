'use strict'

const { Client } = require('es7')
const client = new Client({
    node: " http://localhost:9200"
})
client.info({}, {}, (err, result)=>{
    if(err) {return console.error(err)}
    console.log(result.body)
})
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
"South": ["Ashdod", "BeerSheva", "Netanya", "Mushrooms", "Olives", "Onions", "Cheese", "Peppers", "Tomato"]
};
function getRegion(city) {
for (const [region, cities] of Object.entries(regions)) {
    if (cities.includes(city)) {
    return region;
    }
}
return null; // city not found in any region
}
// Define some sample data
function generateRandomOrder() {
    const stores = ["Jerusalem", "TelAviv", "Haifa", "RishonLeZion",
    "PetahTikva", "Ashdod", "Netanya", "BeerSheva", "BneiBrak",
     "Holon", "BatYam", "RamatGan", "Rehovot", "Herzliya", "KfarSaba", "Nahariya", "Modi'in-Maccabim-Re'"];
    const areas = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'];
    const dates = ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05'];
    const times = ['10:00', '11:00', '12:00', '13:00', '14:00'];
    const statuses = ['New', 'In Progress', 'Delivered'];
    
    const s_name = stores[Math.floor(Math.random() * stores.length)]
    const order = {
      order_id: Math.floor(Math.random() * 1000000),
      store_id: ids[s_name],
      store_name: s_name,
      area: getRegion(s_name),
      date: dates[Math.floor(Math.random() * dates.length)],
      time: times[Math.floor(Math.random() * times.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      olives: Math.random() < 0.5 ? 'Yes' : 'No',
      corn: Math.random() < 0.5 ? 'Yes' : 'No',
      mushrooms: Math.random() < 0.5 ? 'Yes' : 'No',
      anshoby: Math.random() < 0.5 ? 'Yes' : 'No',
      onions: Math.random() < 0.5 ? 'Yes' : 'No',
      cheese: Math.random() < 0.5 ? 'Yes' : 'No',
      peppers: Math.random() < 0.5 ? 'Yes' : 'No',
      tomato: Math.random() < 0.5 ? 'Yes' : 'No',
    };
  
    return order;
  }
  // Upload the data to Elasticsearch
  async function uploadData() {
    for (let i = 0; i < 60; i++) {
      await client.index({
        index: 'pizza-data-v1',
        body: generateRandomOrder(),
      });
    }
    console.log('Data uploaded to Elasticsearch');
  }
  
  // Perform a basic search
  async function search() {
    const { body } = await client.search({
      index: 'pizza-data-v1',
      body: {
        query: {
          match: { store_name: 'TelAviv' },
        },
      },
    });
    console.log(body.hits.hits);
  }
  
  // Call the uploadData function to upload the data to Elasticsearch
uploadData();
  
  // Call the search function to perform a search
//search();