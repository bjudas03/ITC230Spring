const mongoose = require("mongoose");
const config = require('../config');

const connectionString = "mongodb+srv://"+ config.dbuser + ":" + config.dbPassword + "@cluster0-iejfy.mongodb.net/test?retryWrites=true"

// console.log(config);

mongoose.connect(connectionString, {
  dbName: config.dbName,
  useNewUrlParser: true
});

mongoose.connection.on('open', () => {
  console.log("Mongoose connected");
})


//Books Schema
const mySchema = mongoose.Schema({
  title: {type: String, required: true},
  author: String,
  genre: String
});


module.exports = mongoose.model('Book', mySchema);

