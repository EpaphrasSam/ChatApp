import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return new NextResponse("Missing fields", {
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    switch (error.code) {
      case "P2002":
        return new NextResponse("Email already exists", {
          status: 400,
        });
      default:
        return new NextResponse(error.message || "Internal Server Error", {
          status: error.code || 500,
        });
    }
  }
}
