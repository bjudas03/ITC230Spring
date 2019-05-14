const Book = require('./models/Book.js');

const getAll = () => {
  const data = Book.find({}, (err, result) => {
    return result;
  });
  return data;
};

const getOne = (name) => {
  const data = Book.findOne({'title': name}, (err, result) => {
    return result;
  });
  return data;
}

const deleteOne = (name) => {
 const data = Book.deleteOne({'title': name}, (err, result) => {
  if (err) return err;
 })
 return data;
};

const addBook = (addition) => {
  const data = Book.findOneAndUpdate({'title':addition.title}, addition, {upsert:true, returnNewDocument: true, useFindAndModify: false}, (err, result) => {
    if (err) return err;
    return result;
  });
  return data;
}


module.exports = {
  getAll,
  getOne,
  addBook,
  deleteOne
}