"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  useEffect(() => {
    const sessionString = sessionStorage.getItem("myvalue");

    if (sessionString) {
      setName(sessionString);
    }
  }, []);

  function handleSetName() {
    sessionStorage.setItem("myvalue", name);
    setName("");
  }

  function joinRoom() {
    handleSetName();
    window.location.href = `/rooms/${roomId}`;
  }

  async function createRoom() {
    handleSetName();

    const room = await axios.post("http://localhost:4000/api/rooms", {
      name: roomName,
    });

    window.location.href = `/rooms/${room.data.id}`;
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-center text-3xl font-bold mt-24 mb-12">
        Real-Time Chat
      </h1>
      <Label>Username</Label>
      <Input
        value={name}
        placeholder="Username"
        onChange={(e) => setName(e.target.value)}
      />
      <div className="my-2 space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-700 hover:bg-blue-800">Join Room</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a Room</DialogTitle>
              {/* <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription> */}
            </DialogHeader>
            <Label>Room Id</Label>
            <Input
              value={roomId}
              placeholder="Room id to join"
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Button onClick={joinRoom}>Join</Button>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-700 hover:bg-green-800">
              Create Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a Room</DialogTitle>
              {/* <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription> */}
            </DialogHeader>
            <Label>Room Name</Label>
            <Input
              value={roomName}
              placeholder="Your room name"
              onChange={(e) => setRoomName(e.target.value)}
            />
            <Button onClick={createRoom}>Create Room</Button>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
