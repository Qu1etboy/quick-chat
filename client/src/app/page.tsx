"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");

  function handleSetName() {
    sessionStorage.setItem("myvalue", name);
    setName("");
  }

  function joinRoom() {
    handleSetName();
    window.location.href = "/rooms/1";
  }

  function createRoom() {
    handleSetName();

    // window.location.href = "/rooms/2";
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
        <Button onClick={joinRoom} className="bg-blue-700 hover:bg-blue-800">
          Join Room
        </Button>
        <Button
          onClick={createRoom}
          className="bg-green-700 hover:bg-green-800"
        >
          Create Room
        </Button>
      </div>
    </main>
  );
}
