"use server";

import prisma from "../prisma";
import getSession from "@/lib/getSession";

export const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return { messages, error: null };
  } catch (error: any) {
    return { messages: [], error };
  }
};
