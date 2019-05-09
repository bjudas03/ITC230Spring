// const http = require('http');
// const fs = require('fs');
// const qs = require('querystring');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
// const books = require('./lib/myData.json');

const Book = require("./models/Book.js");

const app = express();

app.engine(".html", handlebars({extname: '.html'}));
app.set('view engine', ".html");
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + 'public'));

const routes = require('./routes');




app.get('/', (req, res) => {
  let data = routes.getAll();
  Book.find({}, (err, items) => {
    if (err) return err;
    console.log(items);
  });
  res.render('home', {'books': data})
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/details', (req, res) => {
  let data = routes.getOne(req.query.title);
  res.render('details', {"title": req.query.title, 'book': data});
})

app.get('/delete', (req, res) => {
  let data = routes.deleteOne(req.query.title);
  res.render('home', {"title":req.query.title, "books": data})
})

app.get('/add', (req, res) => {
  let addition = {
    "title" : req.query.title,
    "author" : req.query.author,
    "genre" : req.query.genre
  }
  let data = routes.addBook(addition);
  // console.log(data)
  res.render('home', {'books': data.data, 'msg': data.msg});
})

app.use( (req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send("These are not the pages you are looking for.");
})

app.listen(app.get('port'));