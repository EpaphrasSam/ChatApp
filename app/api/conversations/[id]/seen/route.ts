import getSession from "@/lib/getSession";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

type IParams = {
  id?: string;
};

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { user } = await getSession();
    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: params.id,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return NextResponse.json("Invalid ID", { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation, { status: 200 });
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json(updatedMessage, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json("Internal Error", { status: 500 });
  }
}
