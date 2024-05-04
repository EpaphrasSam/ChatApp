"use server";

import prisma from "../prisma";
import getSession from "../../lib/getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session) throw new Error("User is not authorized");

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!currentUser) throw new Error("User does not exist");

    return { currentUser, error: null };
  } catch (error: any) {
    return { currentUser: null, error };
  }
};

export default getCurrentUser;
