var http = require('http');
var fs = require('fs');

var createServerSnippet =  function(req, res) {
  fs.readFile("index.html", function(err, data ) {
      res.end(data);
  }) ;
}

var app = http.createServer(createServerSnippet).listen(8000);
console.log("listening localhost:8000");

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
    console.log("socket connected");

    socket.on("msgToClient", function(data) {
        io.sockets.emit("msgFromSever", {message: data.msg})
    })
});
