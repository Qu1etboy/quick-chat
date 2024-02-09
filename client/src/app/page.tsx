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
  const [loading, setLoading] = useState(false);

  function joinRoom() {
    window.location.href = `/rooms/${roomId}`;
  }

  async function createRoom() {
    if (!roomName) {
      return toast.error("Please enter a room name");
    }

    setLoading(true);

    try {
      const room = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rooms`,
        {
          name: roomName,
        }
      );

      window.location.href = `/rooms/${room.data.id}`;
      setLoading(false);
    } catch (error) {
      toast.error("Failed to create room");
      setLoading(false);
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
                <Button onClick={createRoom} disabled={loading}>
                  {loading && (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 mr-2 text-white animate-spin fill-orange-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  <span>Create Room</span>
                </Button>
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
