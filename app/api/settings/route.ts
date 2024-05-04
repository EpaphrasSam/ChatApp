import getSession from "@/lib/getSession";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { user } = await getSession();
    const body = await request.json();
    const { name, image } = body;

    const updatedDetails = await prisma.user.update({
      where: {
        email: user?.email,
      },
      data: {
        name,
        image,
      },
    });
    return NextResponse.json(updatedDetails, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
