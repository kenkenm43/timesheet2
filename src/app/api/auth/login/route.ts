import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { userMock } from "@/dbConfig/jsonConfig";
import { UserProps } from "@/types";
import { encrypt } from "@/libs/authen";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const users = await userMock();
    const reqBody = await request.json();
    const { username, password } = reqBody;
    //check if user exists
    const user = await users.find(
      (user: UserProps) => user.username === username
    );
    // const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "ไม่มีชื่อผู้ใช้นี้ในระบบ" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json({ message: "ใส่รหัสผ่านด้วย" }, { status: 400 });
    }
    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "กรอกรหัสผ่านผิด" }, { status: 400 });
    }

    //create token data
    // A JavaScript object (tokenData) is created to store essential user
    // information. In this case, it includes the user's unique identifier (id),
    // username, and email.

    const tokenData = {
      id: user.id,
      username: user.username,
      roles: user.roles,
    };
    const expires = new Date(Date.now() + 10 * 1000000);
    const session = await encrypt({
      tokenData,
      token: process.env.NEXT_PUBLIC_TOKEN_SECRET!,
      expires,
    });
    // Create a token with expiration of 1 day
    const token = await jwt.sign(
      tokenData,
      process.env.NEXT_PUBLIC_TOKEN_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
      message: "เข้าสู่ระบบ",
      success: true,
      token,
    });
    // response.ses

    // Set the token as an HTTP-only cookie
    cookies().set("session", session, {
      expires,
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
