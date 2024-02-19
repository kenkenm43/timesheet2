import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";

const users = [
  { id: 1, username: "kenkenm43", password: "123", roles: ["admin"] },
  { id: 2, username: "geogap", password: "123", roles: ["user"] },
];

export async function POST(request: any) {
  const body = await request.json();
  const user = users.find((user) => user.username === body.username);
  const checkPassword = user?.password === body.password;
  if (checkPassword) {
    const token = await new SignJWT({
      username: user?.username,
      roles: user?.roles,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1200000s")
      .sign(getJwtSecretKey());

    const response = NextResponse.json(
      { success: true },
      { status: 200, headers: { "content-type": "application/json" } }
    );
    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
    });
    return response;
  }
  return NextResponse.json({ success: false });
}
