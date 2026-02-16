import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}


export async function PUT(req:Request, context:{params: Promise<{id: string}>}){
    const {id} = await context.params;
    const data = await req.json();
    const task = await prisma.task.update({
        where: {id: Number(id)},
        data,
    })

    return NextResponse.json(task);
}



export async function DELETE(_req: Request,
    context: {params: Promise<{id: string}>}
){
    const {id} = await context.params;

    await prisma.task.delete({
        where: { id:Number(id)},
    })
    return NextResponse.json({success: true});
}
