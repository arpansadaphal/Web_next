"use client";

import { useState } from "react";

export default function TaskForm() {
  const [title, setTitle] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    setTitle("");
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 flex-1"
        placeholder="New task..."
      />
      <button className="bg-black text-white px-4">
        Add
      </button>
    </form>
  );
}
