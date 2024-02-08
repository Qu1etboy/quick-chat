"use client";

import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function NameForm() {
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
      <Label>Name</Label>
      <Input
        value={name}
        placeholder="Enter your name"
        onChange={(e) => handleSetName(e.target.value)}
      />
      <p className="mt-1 text-sm text-gray-600">
        Enter your name to be display when chatting.
      </p>
    </div>
  );
}
