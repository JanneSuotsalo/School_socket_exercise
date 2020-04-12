"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });

  socket.on("chat message", (msg, room) => {
    console.log("message: ", msg);
    console.log(room);
    io.to(room).emit("chat message", msg);
  });

  socket.on("change room", (room) => {
    console.log("changing to room: ", room);
    socket.join(room);
  });

  socket.on("leave room", (room) => {
    console.log("left a room: ", room);
    socket.leave(room);
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
