const mongoose = require('mongoose');
const scheme = mongoose.Schema;

const username = 'ofek'
const password = 'ofek1234'
const uri = `mongodb+srv://${username}:${password}@cluster0.aj8giej.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));
