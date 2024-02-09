"use client";

import NameForm from "@/components/shared/name-form";
import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";

export default function JoinRoom({ params }: { params: { id: string } }) {
  const [error, setError] = React.useState(false);

  function joinRoom() {
    const name = sessionStorage.getItem("name");
    setError(false);

    if (!name) {
      setError(true);
      toast.error("Please enter your name");
      return;
    }

    window.location.href = `/rooms/${params.id}`;
  }

  return (
    <main className="container mx-auto max-w-3xl py-24">
      <h1 className="text-center my-10 font-display text-3xl font-extrabold leading-[1.15] text-black sm:text-5xl sm:leading-[1.15]">
        Enter your name to join to this room
      </h1>
      <NameForm error={error} />
      <Button onClick={joinRoom} className="mt-8 w-full">
        Join
      </Button>
    </main>
  );
}
