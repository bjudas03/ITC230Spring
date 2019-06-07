module.exports = (app) => {

  const dbMethods = require('./dbMethods');
  const Book = require('./models/Book.js');



  console.log("routes.js is reading");

  //Express handlers
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

  //COMMENTED OUT UNTIL API POST REQUEST FUNCTIONS
  // app.post('/add', (req,res) => {
  //   dbMethods.addBook(req.body);
  //   let msg = "You have added or updated " + req.body.title + " to the database.";
  //   dbMethods.getAll()
  //     .then((items) => {
  //       res.render('home', {'books': items, 'msg': msg});
  //   })
  // })


  //API routes

  //request all books
  app.get('/api/v1/books', (req, res) => {
    console.log("In the getAll route")
    Book.find({}, (err, items) => {
      console.log(items);
      res.type('text/html');
      res.json(items);
    })
  });

  //add single book based on url data;
  app.get('/api/v1/books/add', (req, res) => {
    console.log("In the GET add route")
    const urlBook = {
      'title': req.query.title,
      'author': req.query.author,
      'genre': req.query.genre
    }
    Book.findOneAndUpdate(
      {'title': urlBook.title},
      urlBook,
      {
        upsert: true,
        returnNewDocument: true,
        useFindAndModify: false
      }, (err, result) => {
        console.log(result);
        res.type('text/html');
        res.send(result);
      }
    )
  })

  //add single book based on post data from home.html
  app.post('/api/v1/books/add', (req, res) => {
    console.log("In the POST add route")
    console.log(req.body);
    Book.findOneAndUpdate({
      'title': req.body.title},
      req.body,
      {
        upsert: true,
        new: true,
        useFindAndModify: false
      }, (err, result) => {
        console.log(result);
        if (err) return err;
        res.type('text/html');
        if (result == null) {
          res.send(req.body.title + " has been added to the database");
        } else {
          res.send(result.title + " has been updated in the database");
        }
      })
  })

  //request single book based on title
  app.get('/api/v1/books/:title', (req, res) => {
    console.log("In the get one route")
    const queryParam = req.param.title;
    let caseInsensitiveQueryParam = new RegExp(queryParam, "i");
    // console.log(queryParam);
    Book.findOne({"title": caseInsensitiveQueryParam}, (err, item) => {
      res.type('text/html');
      res.send(item);
    })
  });

  //delete single book based on title
  app.get('/api/v1/books/delete/:title', (req, res) => {
    console.log("In the api delete route");
    const queryParam = req.param.title;
    let caseInsensitiveQueryParam = new RegExp(queryParam, "i");
    Book.deleteOne({"title": caseInsensitiveQueryParam}, (err, response) => {
      console.log(response);
      res.type('text/html');
      res.send(response.deletedCount + " item has been deleted from the database")
    })
  })



  //default error => unable to find route
  app.use( (req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send("You're in the routes.js file, but can't find the route");
  })
}