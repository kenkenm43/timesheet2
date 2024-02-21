"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserProps } from "@/types";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    idCard: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        user
      );
      router.replace("/login");
    } catch (error: any) {
      const { message } = error.response.data;
      console.log(message);
      setErrorMessage(message);
      console.log("Signup failed", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="username">ชื่อผู้ใช้งาน</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="ชื่อผู้ใช้งาน"
      />
      <label htmlFor="idCard">เลขบัตรประชาชน</label>
      <input
        id="idCard"
        type="text"
        value={user.idCard}
        onChange={(e) => setUser({ ...user, idCard: e.target.value })}
        placeholder="เลขบัตรประชาชน"
      />{" "}
      <label htmlFor="firstName">ชื่อจริง</label>
      <input
        id="firstName"
        type="text"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        placeholder="ชื่อจริง"
      />{" "}
      <label htmlFor="lastName">นามสกุล</label>
      <input
        id="lastName"
        type="text"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        placeholder="นามสกุล"
      />{" "}
      <label htmlFor="password">รหัสผ่าน</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="รหัสผ่าน"
      />
      <button onClick={onSignup}>ลงทะเบียน</button>
      {errorMessage}
      <Link href="/login">ไปหน้าเข้าสู่ระบบ</Link>
    </div>
  );
};

export default Register;
