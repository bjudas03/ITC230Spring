let data = [
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
  return data;
}

const getOne = (name) => {
  return data.find((item) => {
    return item.title.toLowerCase() == name.toLowerCase();
  })
}

const deleteOne = (name) => {
  data = data.filter((item) => {
    if (item.title.toLowerCase() !== name.toLowerCase()) {
      return item;
    }
  })

  return data;
}

const addBook = (addition) => {
  data.push({
    "title" : addition.title,
    "author" : addition.author,
    "genre" : addition.genre
  })
  return data;
}



module.exports = {
  getAll,
  getOne,
  deleteOne,
  addBook
}


