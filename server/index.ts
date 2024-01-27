// server.ts
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  // console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat", (msg: any) => {
    console.log("From Client: " + msg);
    io.emit("chat", msg);
    // console.log("To Client: " + msg);
  });
});

server.listen(4000, () => {
  console.log("Server listening on port 3001");
});
