import getSession from "@/lib/getSession";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await getSession();
    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: params.id,
      },
      include: {
        users: true,
      },
    });
    if (!existingConversation) {
      return NextResponse.json("Invalid ID", { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: params.id,
        userIds: {
          hasSome: [user.id],
        },
      },
    });
    revalidatePath("/conversations");
    return NextResponse.json(deletedConversation, { status: 200 });
  } catch (error: any) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
