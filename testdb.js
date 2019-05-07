// const Book = require("./models/Book.js");


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbuser:Ioafw2981@cluster0-iejfy.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


// Book.find({}, (err, items) => {
//     if (err) return next(err);
//     console.log(items);
//   });