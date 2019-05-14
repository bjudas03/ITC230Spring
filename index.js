const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const Book = require("./models/Book.js");

const app = express();

app.engine(".html", handlebars({extname: '.html'}));
app.set('view engine', ".html");
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + 'public'));

const routes = require('./routes');
const dbMethods = require("./dbMethods");




app.get('/', (req, res, next) => {
  dbMethods.getAll()
    .then((data) => {
      res.render('home', {'books': data});
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
      res.render('home', {'title': req.query.title, 'books': items})
  })
})

app.post('/add', (req,res) => {
  dbMethods.addBook(req.body);
  let msg = "You have added or updated " + req.body.title + " to the database.";
  dbMethods.getAll()
    .then((items) => {
      res.render('home', {'books': items, 'msg': msg});
  })
})


//KEEP AS BACKUP - WORKS FINE
// app.get('/add', (req, res) => {
//   let addition = {
//     'title': req.query.title,
//     'author': req.query.author,
//     'genre': req.query.genre
//   }
//   dbMethods.addBook(addition)
//   let msg = "You have added or updated " + req.query.title + " in the database. Check it out in the link!";
//   dbMethods.getAll().then((items, msg) => {
//     res.render('home', {'books': items, 'msg': msg})
//   })
// })

app.use( (req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send("These are not the pages you are looking for.");
})

app.listen(app.get('port'));