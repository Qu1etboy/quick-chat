"use client";

import NameForm from "@/components/shared/name-form";
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
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [roomName, setRoomName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  function joinRoom() {
    window.location.href = `/rooms/${roomId}`;
  }

  async function createRoom() {
    if (!roomName) {
      return toast.error("Please enter a room name");
    }

    try {
      const room = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rooms`,
        {
          name: roomName,
        }
      );

      window.location.href = `/rooms/${room.data.id}`;
    } catch (error) {
      toast.error("Failed to create room");
      console.error(error);
    }
  }

  return (
    <>
      <main className="container mx-auto max-w-3xl py-24">
        <div className="group mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          🎉 Project 1 Socket Programming
        </div>
        <h1 className="text-center mt-10 font-display text-3xl font-extrabold leading-[1.15] text-black sm:text-5xl sm:leading-[1.15]">
          Quickly Chat With Your Friends
        </h1>
        <p className="mt-5 text-gray-600 text-center text-lg">
          Easily chat with your friends just invite them to the room and start
          talking!
        </p>
        <section className="mt-12">
          <NameForm />
          <div className="flex justify-center my-8 space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-700 hover:bg-blue-800 rounded-full">
                  Join Room
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join a Room</DialogTitle>
                  <DialogDescription>
                    Enter your friend&apos;s room id to join.
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <Label>Room Id</Label>
                  <Input
                    value={roomId}
                    placeholder="Room id to join"
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                </div>
                <Button onClick={joinRoom}>Join</Button>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-700 hover:bg-green-800 rounded-full">
                  Create Room
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a Room</DialogTitle>
                  <DialogDescription>
                    Create a room and invite your friends to join.
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <Label>Room Name</Label>
                  <Input
                    value={roomName}
                    placeholder="Your room name"
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                <Button onClick={createRoom}>Create Room</Button>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <footer className="text-center text-gray-600 text-sm mt-8">
        <p>
          Made with 🧙 by{" "}
          <a
            href="https://qu1etboy.dev"
            target="_blank"
            className="text-orange-500 hover:underline"
          >
            6410406860 Weerawong Vonggatunyu
          </a>
        </p>
        <a
          href="https://github.com/Qu1etboy/cs351-socket-programming"
          target="_blank"
          className="text-orange-500 hover:underline"
        >
          Source code
        </a>
      </footer>
    </>
  );
}
