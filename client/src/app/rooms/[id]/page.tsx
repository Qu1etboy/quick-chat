"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { format } from "date-fns";
import { Copy, LogOut, Send } from "lucide-react";
import CopyButton from "@/components/shared/copy-button";
import randomColor from "randomcolor";

type Message = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

type Room = {
  id: string;
  name: string;
  messages: Message[];
};

export default function Room({ params }: { params: { id: string } }) {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<Room>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const socket = io("http://localhost:4000");

  useEffect(() => {
    const sessionString = sessionStorage.getItem("name");

    if (sessionString) {
      setName(sessionString);
    } else {
      window.location.href = "/";
    }

    const fetchRoom = async () => {
      const room = await axios.get(
        `http://localhost:4000/api/rooms/${params.id}`
      );
      setMessages(room.data.messages);
      setRoom(room.data);
    };

    fetchRoom();

    // Add a listener for incoming messages
    const handleIncomingMessage = (msg: Message) => {
      console.log(msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on("connect", () => {
      console.log("connected");
    });

    // Add the listener
    socket.on("chat", handleIncomingMessage);

    // Remove the listener when the component unmounts
    return () => {
      socket.off("chat", handleIncomingMessage);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("chat", { roomId: params.id, author: name, text: message });
    setMessage("");
  };

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom of a chat window
    chatRef.current?.scroll({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <main className="container mx-auto">
      <h1 className="text-center text-3xl font-bold mt-24 mb-12">
        <span className="text-orange-500"> {room?.name}</span>&apos;s Room
      </h1>
      <div className="flex items-center justify-between">
        <h2 className="text-xl">
          Username: <span className="text-orange-500"> {name}</span>
        </h2>
        <div className="space-x-3">
          <CopyButton
            label={
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy url
              </>
            }
            copiedLabel={
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copied
              </>
            }
            value={window.location.href}
          />
          <Button
            variant="destructive"
            onClick={() => (window.location.href = "/")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Leave Room
          </Button>
        </div>
      </div>
      <div
        ref={chatRef}
        className="bg-white h-[400px] overflow-scroll border my-6 px-3 py-1 space-y-1"
      >
        {messages.map((message, index) => (
          <div key={index}>
            <span className="text-gray-500 text-sm">
              {format(new Date(message.createdAt), "PP")}
            </span>{" "}
            <span
              style={{
                color: randomColor({
                  seed: message.author,
                  luminosity: "dark",
                }),
              }}
            >
              {message.author}
            </span>{" "}
            👉 {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
      </form>
    </main>
  );
}
