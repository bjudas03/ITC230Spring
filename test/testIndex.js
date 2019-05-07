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
  it("Returns all books", () => {
    const result = routes.getAll();
    expect(result).to.deep.equal(routes.books);
  });  

  //HOW TO TEST??
  it("Fails with no results", () => {
    const result = routes.getAll('someParam');
    expect(result).to.be.undefined;
  });
});



//Delete route test
// describe("Delete Route", () => {
//   //Success conditions
//   it("Returns array without deleted book", () => {
//     const result = routes.deleteOne("dune");
//     expect(result).to.deep.equal(routes.data.filter((item) => {
//       return item.title !== 'Dune';
//     }))
//   })

//   it("Returns array with deleted book", () => {
//     const result = routes.deleteOne("Fake");
//     expect(result).to.deep.equal(routes.data);
//   })
// })