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
  const data = Book.findOneAndUpdate({
    'title':addition.title}, //Search db for addition.title
    addition, //book object to be inserted
    {
      upsert:true, //creates data if not already existant, edits if addition.title exists
      new: true, //returns updated document instead of original document
      useFindAndModify: false //FindAndModify is depreciated, so set to false
    }, (err, result) => {
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