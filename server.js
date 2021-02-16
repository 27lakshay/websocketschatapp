const express = require("express");
const { v4: uuidv4 } = require("uuid");
const WebSocket = require("ws");
//to create our own node http server
var http = require("http");
const app = express();
//server port
const port = 5000;

// passed express instance to the server
var server = http.createServer(app);

const WebSocketServer = new WebSocket.Server({ server });

var clients = [];
WebSocketServer.on("connection", (ws) => {
    var client_uuid = uuidv4();
    clients.push({ id: client_uuid, ws: ws });
    // ws.send(client_uuid);
    // console.log(`Client ${client_uuid} connected`);

    ws.on("message", (message) => {
        for (var i = 0; i < clients.length; i++) {
            var clientSocket = clients[i].ws;
            if (clients[i].ws != ws) {
                clientSocket.send(
                    JSON.stringify({
                        id: client_uuid,
                        message: message,
                    })
                );
                console.log(message);
            }
        }
    });

    // ws.on("message", function (message) {
    //     for (var i = 0; i < clients.length; i++) {
    //         var clientSocket = clients[i].ws;
    //         console.log("client [%s]: %s", clients[i].id, message);
    //         clientSocket.send(
    //             JSON.stringify({
    //                 id: client_uuid,
    //                 message: message,
    //             })
    //         );
    //     }
    // });
});
// });

// server is listening here
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
