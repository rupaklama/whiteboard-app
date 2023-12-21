import { io } from "socket.io-client";
import { store } from "../store/store";
import { setElements, updateElement } from "../Whiteboard/whiteboardSlice";

// socket object
let socket;

export const connectWithSocketServer = () => {
  // socket.io server
  socket = io("http://localhost:3003");

  socket.on("connect", () => {
    console.log(`${socket.id} Client user connected to Socket.io Server!`);
  });

  // STEP: 1
  // custom event listeners to use socket server data into our redux store on Initial connection
  socket.on("whiteboard-state", elements => {
    store.dispatch(setElements(elements));
  });

  // STEP: 3 - Update our Redux Store with upto date data to share across all users
  socket.on("element-update", elementData => {
    store.dispatch(updateElement(elementData));
  });
};

// STEP: 2
// Emit Client event to the Socket Server to share current updated data with all users - updateElement.js
export const emitElementUpdate = elementData => {
  // note: emit event name can be anything
  socket.emit("element-update", elementData);
};
