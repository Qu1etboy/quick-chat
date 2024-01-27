"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

type Message = {
  // id: string;
  sender: string;
  text: string;
};

export default function Room() {
  const [value, setValue] = useState<string>("");

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const socket = io("http://localhost:4000");

  useEffect(() => {
    const sessionString = sessionStorage.getItem("myvalue");

    if (sessionString) {
      setValue(sessionString);
    } else {
      window.location.href = "/";
    }

    socket.on("connect", () => {
      console.log("connected");
    });

    // Add a listener for incoming messages
    const handleIncomingMessage = (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    // Add the listener
    socket.on("chat", handleIncomingMessage);

    // Remove the listener when the component unmounts
    return () => {
      socket.off("chat", handleIncomingMessage);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("chat", { sender: value, text: message });
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        >
          Send
        </button>
      </form>
      <div className="my-6">
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender} 👉 {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}
