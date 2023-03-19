const bigml = require('bigml');
// export BIGML_USERNAME=oalon52
// export BIGML_API_KEY=5447b285ad89ca29b2c54284248a3bbc51fe673a


const username = 'oalon52';
const apiKey = '5447b285ad89ca29b2c54284248a3bbc51fe673a';

const connection = new bigml.BigML(username, apiKey);


function generateItemSets(){
    return new Promise(async (resolve,reject) => {
    var source = new bigml.Source(connection);
      source.create('./data.csv', (error, sourceInfo) => {
        if (!error && sourceInfo) {
          var dataset = new bigml.Dataset(connection);
          dataset.create(sourceInfo, (error, datasetInfo) => {
            if (!error && datasetInfo) {
              var association = new bigml.Association(connection);
              association.create(datasetInfo,async (error, modelInfo) => {
                if (!error && modelInfo) {
                  console.log('wow')
                  var rules = await getRules(modelInfo.resource)
                  console.log(rules)
                  resolve(rules)
                  
                }
                else{
                  console.log("problem")
                }
              });
            }
            else{
                console.log("problem2")
              }
          });
        }
        else{
            console.log("problem3")
          }
      });
    })
    }
    
    
     function getRules(associationId){
      return new Promise(async (resolve,reject) => {
      let rules = [];       
      var association = new bigml.Association(connection)
     
      association.get(associationId, true,
                      'only_model=true;limit=-1',
                     async (error, resource)=> {
              if (!error && resource) {
                  try{
              var localAssociation = new bigml.LocalAssociation(resource);
                  } catch(error){return;}
              
              let itemsMap ={};
              
              localAssociation.items.forEach((item)=>{
                  itemsMap[item.index]=item.name;
              })
              localAssociation.getRules().forEach((rule)=>{
                  let lhs = rule.lhs;
                  let items="";
                  lhs.forEach((index)=>{
                      items+=itemsMap[index]+","
                  })
      
                  let rhs = rule.rhs;
                  let compliment="";
                  rhs.forEach((index)=>{
                    compliment+=itemsMap[index]+","
                  })
      
                  let confidence = rule.confidence;
                  let support = rule.support;
                  rules.push({items: items, compliment: compliment,support: support,confidence: confidence})
              })
              var final = rules 
              resolve(final)
              }
          })                  
      })
    }
    
async function fucK(){
    var result = await generateItemSets();
    parsed = JSON.stringify(result,null,2)
    console.log(parsed)
}
fucK()