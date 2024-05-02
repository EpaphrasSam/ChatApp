"use server";

import prisma from "../prisma";
import getSession from "../../lib/getSession";

export const getUsers = async () => {
  try {
    const { user } = await getSession();

    if (!user) {
      throw new Error("User is not authorized");
    }
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: user?.email,
        },
      },
    });
    return { users, error: null };
  } catch (error: any) {
    return { users: [], error };
  }
};
