import prisma from "@/lib/prisma";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default async function Home() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm />
      <TaskList tasks={tasks} />
    </main>
  );
}
