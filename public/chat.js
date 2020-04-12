"use strict";

const socket = io();
let room = "";
let username;

function addName() {
  username = prompt("Please enter your name:", "");
  if (username == null || username == "") {
    alert("you did not add a name, defaulting name to User");
    username = "User";
  }
}

document.querySelector("form").addEventListener("submit", (event) => {
  if (room == "") {
    alert("Choose a room to start chatting");
    event.preventDefault();
  } else {
    event.preventDefault();
    const inp = document.getElementById("m");
    const message = username + ": " + inp.value;
    socket.emit("chat message", message, room);
    inp.value = "";
  }
});

const changeRoom = (element) => {
  socket.emit("leave room", room);

  //user leave msg
  if (room != element.innerHTML) {
    let userChangeRoomMessage =
      "--------" +
      username +
      " switched to room: " +
      element.innerHTML +
      "--------";
    socket.emit("chat message", userChangeRoomMessage, room);
  }

  // user join msg
  if (room != element.innerHTML) {
    let userChangeRoomMessage =
      "--------" + username + " joined room: " + element.innerHTML + "--------";
    socket.emit("chat message", userChangeRoomMessage, element.innerHTML);
  }

  room = element.innerHTML;
  document.getElementById("roomTitle").innerHTML = "Current room: " + room;
  socket.emit("change room", room);
};

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.innerHTML = msg;
  document.getElementById("messages").appendChild(item);
});
