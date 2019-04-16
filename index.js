const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const books = require('./lib/myData.json')

const routes = require('./routes');

http.createServer(function(req,res) {
  const url = req.url.toLowerCase().split("?");
  let path = url[0];
  let query = qs.parse(url[1]);

  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile('public/home.html', function(err, data) {
        if (err) return err;
        res.write(data);
        res.end();
      })
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile('public/about.html', function(err, data) {
        if (err) return err;
        res.write(data);
        res.end();
      })
      break;
    case '/getall':
      var data = routes.getAll(books);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(data));
      break;
    case '/get': 
      var data = routes.getOne(books, query);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(data))
      break;
    case '/delete':
      var data = routes.deleteOne(books, query);
      res.writeHead(200, {'Content-Type' : 'text/plain'})
      res.end("You have removed:" + JSON.stringify(query.title) + "\n" + JSON.stringify(data));
    default:
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end("<h1>No. I don't wanna show you this. Bleargh!</h1>")
      break;
  };
}).listen(process.env.PORT || 3000);