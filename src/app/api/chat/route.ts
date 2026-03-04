export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const messages = await prisma.chatMessage.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const body = await req.json();
  
  if (!body.message || !body.name) {
    return NextResponse.json(
      { error: "Name and message are required" },
      { status: 400 }
    );
  }

  const forwarded = req.headers.get("x-forwarded-for");
  const ipAddress = forwarded ? forwarded.split(",")[0] : "unknown";

  const chatMessage = await prisma.chatMessage.create({
    data: {
      name: body.name,
      email: body.email || null,
      message: body.message,
      ipAddress: ipAddress,
    },
  });

  return NextResponse.json(chatMessage);
}

export async function PUT(req: Request) {
  const body = await req.json();
  
  if (body.id && body.reply !== undefined) {
    const updated = await prisma.chatMessage.update({
      where: { id: body.id },
      data: {
        reply: body.reply,
        isRead: true,
      },
    });
    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    await prisma.chatMessage.delete({ where: { id } });
  }

  return NextResponse.json({ success: true });
}
