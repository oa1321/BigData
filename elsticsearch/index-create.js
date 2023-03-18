const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function createIndex() {
  try {
    const response = await client.indices.create({
      index: 'my_index',
      body: {
        mappings: {
          properties: {
            name: { type: 'text' },
            age: { type: 'integer' },
            city: { type: 'text' },
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