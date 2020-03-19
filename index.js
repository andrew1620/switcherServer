const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

server.listen(3002);

const connections = [];
let state = {
  btnStatus: false
};

io.sockets.on("connection", function(socket) {
  console.log("Успешное соединение");

  connections.push(socket);

  socket.on("disconnect", function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Отсоединение");
  });

  io.sockets.emit("added btnStatus", state);

  socket.on("send btnStatus", function(data) {
    state = { btnStatus: data.btnStatus };

    io.sockets.emit("added btnStatus", state);
  });
});
