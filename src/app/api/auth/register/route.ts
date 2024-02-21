import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import fsPromises from "fs/promises";
import path from "path";
import { UserProps } from "@/types";
import { randomBytes } from "crypto";
import { userMock, usersFilePath } from "@/dbConfig/jsonConfig";
export async function POST(request: NextRequest) {
  // Defines an asynchronous POST request handler.
  try {
    // read json file
    const users = await userMock();
    // parse it into a JSON array
    // destructure values from request body
    const { username, password, firstName, lastName, idCard } =
      await request.json();
    // Parses the request body to extract username, email, and password.
    //gererate the ID for the new user
    const id = randomBytes(16).toString("hex");
    //Checks if a user with the provided email already exists.
    const user = await users.find(
      (user: UserProps) => user.username === username
    );
    const haveIdCard = await users.find(
      (user: UserProps) => user.idCard === idCard
    );

    //If yes, returns a 400 response.
    if (user) {
      return NextResponse.json(
        { message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" },
        { status: 400 }
      );
    }
    if (haveIdCard)
      return NextResponse.json(
        { message: "รหัสบัตรประชาชนนี้ถูกลงทะเบียนแล้ว" },
        { status: 400 }
      );

    //hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    users.push({
      id,
      username,
      password: hashedPassword,
      firstName: firstName || "",
      lastName: lastName || "",
      idCard: idCard || "",
      roles: ["user"],
    });
    //convert JSON array back to string
    const updatedData = JSON.stringify(users);
    await fsPromises.writeFile(usersFilePath, updatedData);

    return NextResponse.json(
      {
        message: "User created successfully!",
        success: true,
      },
      { status: 201, headers: { "content-type": "application/json" } }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
