
function getAll(data) {
  return data;
}

function getOne(data, name) {
  let tempItem = data.filter((item) => {
    if (item.title.toLowerCase() == name.title.toLowerCase()) {
      return item;
    }  
  })
  return tempItem;
}

function deleteOne(data, name) {
  let tempItem = data.filter((item) => {
    if (item.title.toLowerCase() !== name.title.toLowerCase()) {
      return item;
    }
  })
  return tempItem;
}



module.exports = {
  getAll,
  getOne,
  deleteOne
}


