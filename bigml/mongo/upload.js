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
  const newOrder = new Order({
        toppings: ['olives', 'corn','mushrooms', 'anchovy', 'onions', 'cheese','peppers','tomato']
  });

  newOrder.save()
  .then(() => console.log('Order saved to MongoDB'))
  .catch((err) => console.error('Error saving order to MongoDB', err));