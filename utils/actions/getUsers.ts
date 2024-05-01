"use server";

import prisma from "../prisma";
import getSession from "./getSession";

const getUsers = async () => {
  try {
    const session = await getSession();

    if (session?.user?.email) {
      throw new Error("User is not authorized");
    }
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session?.user?.email,
        },
      },
    });
    return users;
  } catch (error: any) {
    // return [];
    throw new Error(error.message || "Failed to get users");
  }
};

export default getUsers;
