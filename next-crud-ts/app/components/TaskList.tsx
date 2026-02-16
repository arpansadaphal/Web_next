"use client";

import { Task } from "@/types/task";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Pencil, Trash, Check, X } from "lucide-react";


interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {

const router = useRouter();
const [editingId, setEditingId] = useState<number | null>(null); 
const [editingTitle, setEditingTitle] = useState("");

  async function toggle(task: Task) {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: !task.completed }),
    });
    // window.location.reload();
    router.refresh();
  }

  async function remove(id: number) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    // window.location.reload();
    router.refresh();
  }
  async function saveTitle(id : number){
    await fetch(`/api/tasks/${id}`,{
      method: "PUT",
      body: JSON.stringify({ title : editingTitle }),
    });

    setEditingId(null);
    setEditingTitle("");
    // window.location.reload();
    router.refresh();
  }
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
<li key={task.id} className="flex items-center border p-2 gap-4">
  
  {/* Task Title / Input */}
  <div className="flex-1">
    {editingId === task.id ? (
      <input
        value={editingTitle}
        onChange={(e) => setEditingTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") saveTitle(task.id);
          if (e.key === "Escape") setEditingId(null);
        }}
        className="border p-1 rounded w-full"
        autoFocus
      />
    ) : (
      <span
        onClick={() => toggle(task)}
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.title}
      </span>
    )}
  </div>

  {/* Action Icons */}
  <div className="flex gap-3 items-center">
    {editingId === task.id ? (
      <>
        <Check
          onClick={() => saveTitle(task.id)}
          className="w-5 h-5 cursor-pointer text-green-500"
        />
        <X
          onClick={() => setEditingId(null)}
          className="w-5 h-5 cursor-pointer text-gray-500"
        />
      </>
    ) : (
      <Pencil
        onClick={() => {
          setEditingId(task.id);
          setEditingTitle(task.title);
        }}
        className="w-5 h-5 cursor-pointer text-yellow-500"
      />
    )}

    <Trash
      onClick={() => remove(task.id)}
      className="w-5 h-5 cursor-pointer text-red-500"
    />
  </div>

</li>

      ))}
    </ul>
  );
}
