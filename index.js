//import dependecies
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

//define server
const app = express();

// const dataMethods = require('./dataMethods.js');
// const dbMethods = require("./dbMethods");

//define data models
const Book = require("./models/Book.js");

//configure express()
app.engine(".html", handlebars({extname: '.html'})); //define view-engine
app.set('view engine', ".html"); //set view-engine
app.set('port', process.env.PORT || 8080); //set port

app.use(bodyParser.urlencoded({extended: true})); //parseing form submissions
app.use(express.static(__dirname + '/public'));  //set static pathname for public files
app.use('/api', require('cors')()); //allow cross-origin


//make routes available
const routes = require('./routes.js')(app);


app.get('/', (req, res, next) => {
  dbMethods.getAll()
    .then((data) => {
      res.render('main', {'books': data});
  });
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/details', (req, res) => {
  dbMethods.getOne(req.query.title)
    .then((data) => {
      res.render('details', {'title': req.query.title, 'book': data});
    })
})

app.get('/delete', (req, res) => {
  dbMethods.deleteOne(req.query.title);
  dbMethods.getAll()
    .then((items, title) => {
      res.render('main', {'title': req.query.title, 'books': items})
  })
})

// app.post('/add', (req,res) => {
//   dbMethods.addBook(req.body);
//   let msg = "You have added or updated " + req.body.title + " to the database.";
//   dbMethods.getAll()
//     .then((items) => {
//       res.render('home', {'books': items, 'msg': msg});
//   })
// })




app.use( (req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send("These are not the pages you are looking for.");
})

app.listen(app.get('port'));