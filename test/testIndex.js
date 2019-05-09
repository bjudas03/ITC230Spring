const expect = require("chai").expect;
const routes = require('../routes.js');

// console.log(routes);


//getOne route test
describe("getOne route", () => {
  it("returns requested book", () => {
    const result = routes.getOne("dune");
    expect(result).to.deep.equal({
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction"
    });
  });

  it("Fails with invalid book", () => {
    const result = routes.getOne("Fake");
    expect(result).to.be.undefined;
  });
});

// getAll route test
describe("getAll route", () => {
  //Success conditions => returns all books
  it("Returns all books", () => {
    const result = routes.getAll();
    expect(result).to.deep.equal(routes.books);
  });  

  //Failure conditions => ????
  //HOW TO TEST??
  it("Fails with no results", () => {
    const result = routes.getAll('someParam');
    expect(result).to.be.undefined;
  });
});



//Delete route test
describe("Delete Route", () => {
  //Success conditions => returns original array w/o specified data item
  it("Returns without deleted book", () => {
    const result = routes.deleteOne("Dune");
    expect(result == routes.books.filter((item) => {
      return item.title !== "dune";
    }))
  })
  //Failure conditions => returns original array length
  it("Attempts to delete item not in dataset. Returns with initial size array", () => {
    const preTestArraySize = routes.books.length;
    const result = routes.deleteOne("Fake");
    expect(result.length == preTestArraySize);
  })
})

//Add route test
describe("Add Route", () => {
  //Success Conditions => returns original array length +1
  it("Returns array with additional book", () => {
    // console.log(routes.books.length);
    const preTestArraySize = routes.books.length;
    const result = routes.addBook({
      "title": "This is a test",
      "author": "Tester",
      "genre": "Test Genre"
    })
    const postTestArraySize = routes.books.length;
    expect(postTestArraySize == preTestArraySize + 1);
  });
  //Failure conditions => Duplicate Book => returns original array length
  it("Fails with duplicate book", () => {
    const preTestArraySize = routes.books.length;
    const result = routes.addBook({
      "title":"Dune",
      "author": "Frank Herbert",
      "genre" : "Science Fiction"
    })
    expect(preTestArraySize == routes.books.length);
  });
})