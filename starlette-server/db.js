const mongoose = require("mongoose");

var mongoURL="mongodb+srv://gauthams:gauthams@cluster0.9u1nmfi.mongodb.net/mern-rooms"

mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true})

var connection = mongoose.connection

connection.on('error',() => {
    console.log('Error in connection')
})

connection.once('connected',() =>{
    console.log('Connected to MongoDB')
})

module.exports = mongoose 
