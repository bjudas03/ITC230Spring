const Book = require("./models/Book.js");


Book.find({}, (err, items) => {
    if (err) return next(err);
    console.log(items);
  });