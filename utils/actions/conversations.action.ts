"use server";

import prisma from "../prisma";
import getSession from "@/lib/getSession";

export const getConversations = async () => {
  try {
    const { user } = await getSession();
    if (!user) {
      throw new Error("User is not authorized");
    }
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: user?.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return { conversations, error: null };
  } catch (error: any) {
    return { conversations: [], error };
  }
};

export const getConversationById = async (conversationId: string) => {
  try {
    const { user } = await getSession();
    if (!user) {
      throw new Error("User is not authorized");
    }
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return { conversation, error: null };
  } catch (error: any) {
    return { conversation: null, error };
  }
};
