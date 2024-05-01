"use server";

import prisma from "../prisma";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) throw new Error("User is not authorized");

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!currentUser) throw new Error("User does not exist");

    return currentUser;
  } catch (error) {
    return error;
  }
};

export default getCurrentUser;
