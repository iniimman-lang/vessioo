export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(testimonials);
}

export async function POST(req: Request) {
  const body = await req.json();
  
  if (!body.name || !body.content || !body.rating) {
    return NextResponse.json(
      { error: "Name, content, and rating are required" },
      { status: 400 }
    );
  }

  const testimonial = await prisma.testimonial.create({
    data: {
      name: body.name,
      content: body.content,
      rating: parseInt(body.rating),
      location: body.location || null,
    },
  });

  return NextResponse.json(testimonial);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    await prisma.testimonial.delete({ where: { id } });
  }

  return NextResponse.json({ success: true });
}
