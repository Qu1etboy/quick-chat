// server.ts
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

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

const prisma = new PrismaClient();

app.post("/api/rooms", async (req, res) => {
  const { name } = req.body;

  console.log("Request body =", name);

  const room = await prisma.room.create({
    data: {
      name,
    },
  });

  res.json(room);
});

app.get("/api/rooms", async (req, res) => {
  const rooms = await prisma.room.findMany({
    include: {
      messages: true,
    },
  });
  console.log(rooms);
  res.json(rooms);
});

app.get("/api/rooms/:id", async (req, res) => {
  const { id } = req.params;

  const room = await prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      messages: true,
    },
  });

  res.json(room);
});

type Message = {
  roomId: string;
  text: string;
  author: string;
};

io.on("connection", (socket: Socket) => {
  // console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat", async (msg: Message) => {
    console.log("From Client: " + msg);

    // Store the message in the database
    const message = await prisma.message.create({
      data: msg,
    });

    io.emit("chat", message);
    // console.log("To Client: " + msg);
  });
});

server.listen(4000, () => {
  console.log("Server listening on port 3001");
});
