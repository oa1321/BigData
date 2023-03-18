const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: " http://localhost:9200"
})
 
 // Perform a basic search
  async function search(s_name, date_c) {
    console.log(s_name,date_c)
    const { body } = await client.search({
      index: 'pizza-data-v1',
      body: {
        query: {
            bool: {
                must: [
                  { match: { store_name: s_name } },
                  { match: { date: date_c } }
                ]
              }
        }
      },
    });
    const hits = body.hits.hits;
  const sources = hits.map(hit => hit._source);

    return  sources;
  }

module.exports = search;