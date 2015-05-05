# Simple-chat-application-in-node.js
Simple chat application in node.js
================

Today I am going to develop a simple chat application using node.js, which transmits messages from one client to all others. I will be using a node.js module that is "socket.io", I assure you that I will make simple and easy to understand.
For building a chat system, I am creating two files:

1. server.js (The name of the file could be anything .js ) and
2. index.html

Try to put both the files in same directory.

1) server.js file

We open server.js and start by loading http module, which we need to handle all http requests and responses. For loading any module in your application we use require method.


      var http = require('http');
    
Now, we actually need to read the index.html file from the file sytem, which is done by node's fs module.
To install use the below command:

      npm install fs


We will load this too:

      var fs = require('fs');

The http module provide us a special method that is createServer, which is invoked everytime somebody sends a request to our server.
  
      var createServerSnippet =  function(req, res) {
        fs.readFile("index.html", function(err, data ) {
            res.end(data);
        }) ;
      }
      
      var app = http.createServer(createServerSnippet).listen(8000);
    
As node.js is a event driven programming language. It uses a special module that is socket.io, It allows us to create a socket connection between the server and clients and call events and send data back and forth without any trouble.
To use socket.io, we first have to install it via the node package manager.

      npm install socket.io
    
Here is the code to for socket connection:

      var io = require('socket.io').listen(app);
      io.sockets.on('connection', function(socket) {
          console.log("socket connected");
      
          socket.on("msgToClient", function(data) {
              io.sockets.emit("msgFromSever", {message: data.msg})
          })
      });
    

So our server.js file will look like this:

server.js
-------
  
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

index.html
-------
  
      <script type="text/javascript" src="/socket.io/socket.io.js"></script>
      <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
      <script type="text/javascript">
           var socket = io.connect("localhost:8000");
      
           function sendMessage() {
               var message = $("#msg").val();
               socket.emit("msgToClient",  { msg: message });
           }
      
           socket.on("msgFromSever", function(data) {
             var msgP = "<p> " + data.message + "</p>";
             $(".chats").append(msgP);
           })
      </script>
      <style type="text/css">
           .chats {
           border: 1px solid #ccc;
           height: 180px;
           overflow-y: scroll;
           width: 20%;
           margin-bottom: 30px;
           }
           #msg {  width: 21%;}
      </style>
      
      <h1>Chat</h1>
      <div class="chats"></div>
      <input type="text" id="msg" />
      <button onclick="sendMessage()" >Send</button>
    
Open a terminal, go to our project directory and type:
-------

    node server.js
  
Now open the below url in two browsers:
-------

    localhost:8000

Njoy :)

For more details please visit:

http://cj7.info/blog/simple-chat-application-in-nodejs
