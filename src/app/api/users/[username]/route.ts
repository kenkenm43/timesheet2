import { NextResponse } from "next/server";
import { users } from "@/data/users";
import { log } from "console";
export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const usernameRequest: string = params?.username;

  const userIdentity: any = users.find(
    (user) => user.username === usernameRequest
  );

  const response = NextResponse.json(
    { success: true, user: userIdentity },
    { status: 200 }
  );
  if (userIdentity) return response;

  return NextResponse.json({ success: false, message: "No data" });
}
