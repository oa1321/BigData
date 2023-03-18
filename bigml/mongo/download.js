const mongoose = require('mongoose');
const scheme = mongoose.Schema;

const username = 'ofek'
const password = 'ofek1234'
const uri = `mongodb+srv://${username}:${password}@cluster0.aj8giej.mongodb.net/pizza-net?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

  const orderSchema = new mongoose.Schema({
    toppings: [String],
    date: { type: Date, default: Date.now}
  });
  const Order = mongoose.model('Order', orderSchema);
  const newOrder = Order.find().then((toppings) => {
    console.log('Available orders:', toppings.length);
  })
  .catch((err) => console.error('Error loading toppings from MongoDB', err));
