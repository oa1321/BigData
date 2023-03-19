const { Client } = require('es7');
const client = new Client({ node: 'http://localhost:9200' });

async function createIndex() {
  try {
    const response = await client.indices.create({
      index: 'pizza-data-v5',
      body: {
        mappings: {
          properties: {
            order_id: { type: 'integer' },
            store_id: { type: 'integer' },
            store_name: { type: 'text' },
            area: { type: 'text' },
            date: { type: 'text' },
            time: { type: 'text' },
            fin_time: {type: 'text'},
            status: { type: 'text' },
            olives: {type: 'text'},
            corn: {type: 'text'},
            mushrooms: {type: 'text'},
            anshoby: {type: 'text'},
            onions: {type: 'text'},
            cheese: {type: 'text'},
            peppers: {type: 'text'},
            tomato: {type: 'text'}
            
          },
        },
      },
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

createIndex();