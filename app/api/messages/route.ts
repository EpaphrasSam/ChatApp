import getSession from "@/lib/getSession";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { user } = await getSession();
    const body = await req.json();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { conversationId, message, image } = body;
    if (!conversationId) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: user.id,
          },
        },
        seen: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(newMessage), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
