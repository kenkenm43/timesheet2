import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";
import { users } from "@/data/users";
export async function GET(request: any) {
  const response = NextResponse.json({ success: true, users }, { status: 200 });
  if (!(users.length === 0)) return response;

  return NextResponse.json({ success: false, message: "No data" });
}
