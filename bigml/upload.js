const mongoose = require('mongoose')

const username = 'ofek'
const password = 'ofek1234'
const uri = `mongodb+srv://${username}:${password}@cluster0.aj8giej.mongodb.net/?retryWrites=true&w=majority`

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("connect to mongodb")
    }
    catch(error){
        console.error(error)
    }
}
connect()