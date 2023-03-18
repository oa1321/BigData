'use strict'

const { Client } = require('es7')
const client = new Client({
    node: " http://localhost:9200"
})
client.info({}, {}, (err, result)=>{
    if(err) {return console.error(err)}
    console.log(result.body)
})

// Define some sample data
const data = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { name: 'Bob Johnson', age: 40, city: 'Chicago' },
  ];
  
  // Upload the data to Elasticsearch
  async function uploadData() {
    for (let i = 0; i < data.length; i++) {
      await client.index({
        index: 'my_index',
        body: data[i],
      });
    }
    console.log('Data uploaded to Elasticsearch');
  }
  
  // Perform a basic search
  async function search() {
    const { body } = await client.search({
      index: 'my_index',
      body: {
        query: {
          match: { name: 'John' },
        },
      },
    });
    console.log(body.hits.hits);
  }
  
  // Call the uploadData function to upload the data to Elasticsearch
  uploadData();
  
  // Call the search function to perform a search
  search();