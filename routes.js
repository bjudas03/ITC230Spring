let books = [
  {
    "title": "Dune",
    "author": "Frank Herbert",
    "genre": "Science Fiction" 
  },{
    "title": "The Princess Bride",
    "author": "William Goldman",
    "genre": "Fantasy" 
  },{
    "title": "Brave New World",
    "author": "Aldous Huxley",
    "genre": "Science Fiction" 
  },{
    "title": "1984",
    "author": "George Orwell",
    "genre": "Science Fiction" 
  },{
    "title": "Stranger in a Strange Land",
    "author": "Robert Heinlein",
    "genre": "Science Fiction" 
  }
]


const getAll = () => {
  return books;
}

const getOne = (name) => {
  return books.find((item) => {
    return item.title.toLowerCase() == name.toLowerCase();
  })
}

const deleteOne = (name) => {
  data = books.filter((item) => {
    if (item.title.toLowerCase() !== name.toLowerCase()) {
      return item;
    }
  })

  return data;
}

const addBook = (addition) => {
  //check to see if addition is alreay in data array
  //returns 'TRUE' if in array, 'False' if NOT in array
  let checkTitle = books.every((item) => {
    return item.title.toLowerCase() !== addition.title.toLowerCase();
  });

  let msg = null;

  if (checkTitle) {
    msg = "You added " + addition.title + " to the data set! Check it out in the link!"
    books.push({
      "title" : addition.title,
      "author" : addition.author,
      "genre" : addition.genre
    })
  } else {
    msg = "You have tried adding " + addition.title + " but that book is already in the system."
  }
  return {data: books, msg: msg};
}



module.exports = {
  books,
  getAll,
  getOne,
  deleteOne,
  addBook
}


