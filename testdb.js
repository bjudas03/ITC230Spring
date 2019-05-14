const Book = require("./models/Book.js");


Book.find({}, (err, items) => {
    if (err) return err;
    console.log(items);
  });