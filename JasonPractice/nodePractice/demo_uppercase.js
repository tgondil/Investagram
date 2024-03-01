var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Hello World!".toLocaleUpperCase());
  res.end();
}).listen(3000);