
// RMB: I re-wrote the author's demo.php script for node.js

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer( { port: 5995 } );

wss.on('listening', function() {
    console.log("listening on port 5995");
    // console.log("curr clients: ",wss.clients);
});

wss.on('connection', function(ws) {
    // console.log("curr clients: ",wss.clients);
    ws.on('message', function(charMsg) {
        console.log("charmsg: ",charMsg);
        if (charMsg == "hello") {
            ws.send("hello human");
        }
        else if (charMsg == "name") {
            ws.send("I don't have a name");
        }
        else if (charMsg == "age") {
            ws.send("I'm old");
        }
        else if (charMsg == "date") {
            ws.send("today is " +  new Date());
        }
        else if (charMsg == "time") {
            ws.send("the time is " + new Date());
        }
        else if (charMsg == "thanks") {
            ws.send("you're welcome");
        }
        else if (charMsg == "bye") {
            ws.send("have a nice day");
        }
        else {
            ws.send("I don't understand");
        }
    });
});
