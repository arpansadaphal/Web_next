import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title } = body;

  if (!title) {
    return NextResponse.json(
      { error: "Title required" },
      { status: 400 }
    );
  }

  const task = await prisma.task.create({
    data: { title },
  });

  return NextResponse.json(task, { status: 201 });
}
