import NameForm from "@/components/shared/name-form";
import { Button } from "@/components/ui/button";
import React from "react";

export default function JoinRoom({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto max-w-3xl py-24">
      <h1 className="text-center my-10 font-display text-3xl font-extrabold leading-[1.15] text-black sm:text-5xl sm:leading-[1.15]">
        Enter your name to join to this room
      </h1>
      <NameForm />
      <Button asChild className="mt-8 w-full">
        <a href={`/rooms/${params.id}`}>Join</a>
      </Button>
    </main>
  );
}
