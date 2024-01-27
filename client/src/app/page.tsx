"use client";

import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");

  function handleSendName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sessionStorage.setItem("myvalue", name);
    setName("");
    window.location.href = "/rooms/1";
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-center text-3xl font-bold mt-24 mb-12">
        Real-Time Chat
      </h1>
      <form onSubmit={handleSendName} className="flex">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={name}
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        >
          Go to Room
        </button>
      </form>
    </main>
  );
}
