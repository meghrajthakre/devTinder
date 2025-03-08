const mongoose = require('mongoose');

// andrewtatte4134
// 


const dbConnection = async ()=>{
//    await mongoose.connect('mongodb+srv://andrewtatte4134:wwSZb8lsyiqrL06o@meghraj.sncsz.mongodb.net/devTinder')

    await mongoose.connect('mongodb+srv://andrewtatte4134:wwSZb8lsyiqrL06o@meghraj.sncsz.mongodb.net/DevTinderTest')
}
module.exports = {dbConnection}
