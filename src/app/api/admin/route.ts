import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";
import { userMock } from "@/dbConfig/jsonConfig";
import { UserProps } from "@/types";
export async function GET(request: any) {
  const users = await userMock();
  // const simpleUsers: UserProps[] = users.filter((user: UserProps) =>
  //   user?.roles.includes("user")
  // );
  const simpleUsers: UserProps[] = users.filter((user: UserProps) =>
    user.roles?.includes("admin")
  );

  const response = NextResponse.json(
    { success: true, users: simpleUsers },
    { status: 200 }
  );
  if (!(users.length === 0)) return response;

  return NextResponse.json({ success: false, message: "No data" });
}
