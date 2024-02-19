import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";
const times = [
  { id: 1, username: "kenkenm43", holidayRemain: 10 },
  { id: 2, username: "geogap", holidayRemain: 10 },
];
export async function GET(request: any) {
  //   const response = NextResponse.json({ success: true, users }, { status: 200 });
  //   if (!(users.length === 0)) return response;

  return NextResponse.json({ success: false, message: "No data" });
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
