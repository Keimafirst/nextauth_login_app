import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // 既存ユーザーの確認
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "This email is already in use.",
        },
        { status: 400 }
      ); // 400: Bad Request
    }

    // PWの暗号化
    const hashed = await hash(password, 12);
    // 登録処理
    const user = await prisma.users.create({
      data: {
        email: email,
        password: hashed,
        username: username,
      },
    });

    return NextResponse.json({
      users: {
        email: user.email,
      },
    });
  } catch (err: unknown) {
    return new NextResponse(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
