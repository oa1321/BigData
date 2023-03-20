const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const scheme = mongoose.Schema;

const orderSchema = new mongoose.Schema({
        toppings: [String],
        date: { type: Date, default: Date.now}
    });

const Order = mongoose.model('Order', orderSchema);



async function get_data(startDate,endDate){
    function shuffle(list) {
        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = list[i];
          list[i] = list[j];
          list[j] = temp;
        }
        
        return list;
      }

    const username = 'ofek'
    const password = 'ofek1234'
    const uri = `mongodb+srv://${username}:${password}@cluster0.aj8giej.mongodb.net/pizza-net?retryWrites=true&w=majority`

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

    

    const newOrder = await Order.find({ date: { $gte: startDate, $lte: endDate }}).then((toppings) => {
        const csvWriter = createCsvWriter({
            path: './views/data/data2.csv',
          });
          const toppings2 = [];

          // Loop over the orders and toppings
          for (let i = 0; i < toppings.length; i++) {
            const order = toppings[i];
            var orderToppings = order.toppings;
            for (let j = 0; j < orderToppings.length; j++){
                if(Math.random() < 0.5){
                    orderToppings[j] = " "+ orderToppings[j]
                }
                
            }
            if(orderToppings != []){
            toppings2.push(shuffle(orderToppings))}

          }
          csvWriter
            .writeRecords(toppings2)
            .then(() => console.log('CSV file written successfully.'));
            
    })
    .catch((err) => console.error('Error loading toppings from MongoDB', err));
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(4000)
    mongoose.disconnect()
}

module.exports = get_data;