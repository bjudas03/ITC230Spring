const http = require('http');
const fs = require('fs');

http.createServer(function(req,res) {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      console.log(path);
      fs.readFile('public/home.html', function(err, data) {
        if (err) return err;
        res.write(data);
        res.end();
      })
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/html'});
      console.log(path);
      fs.readFile('public/about.html', function(err, data) {
        if (err) return err;
        res.write(data);
        res.end();
      })
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end("<h1>No. I don't wanna show you this. Bleargh!</h1>")
      break;
  };
}).listen(process.env.PORT || 3000);