'use strict'

const { Client } = require('es7')
const client = new Client({
    node: " http://localhost:9200"
})
client.info({}, {}, (err, result)=>{
    if(err) {return console.error(err)}
    console.log(result.body)
})
 
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


search()