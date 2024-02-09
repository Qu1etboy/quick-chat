"use client";

import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function NameForm({ error }: { error?: boolean }) {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const sessionString = sessionStorage.getItem("name");

    if (sessionString) {
      setName(sessionString);
    }
  }, []);

  function handleSetName(value: string) {
    sessionStorage.setItem("name", value);
    setName(value);
  }

  return (
    <div>
      <Label className={cn(error && "text-red-600")}>Name</Label>
      <Input
        value={name}
        className={cn(error && "border-red-600")}
        placeholder="Enter your name"
        onChange={(e) => handleSetName(e.target.value)}
      />
      <p className="mt-1 text-sm text-gray-600">
        Enter your name to be display when chatting.
      </p>
      {error && (
        <p className="mt-2 text-sm text-red-600">Please enter your name</p>
      )}
    </div>
  );
}
