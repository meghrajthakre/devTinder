const mongoose = require('mongoose');

// andrewtatte4134
// wwSZb8lsyiqrL06o


const connectDb = async ()=>{
   await mongoose.connect('mongodb+srv://andrewtatte4134:wwSZb8lsyiqrL06o@meghraj.sncsz.mongodb.net/devTinder')

}
module.exports = {connectDb}
