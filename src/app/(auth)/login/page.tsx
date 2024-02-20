"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        user
      );
      router.push("/");
    } catch (error: any) {
      const message = error.response.data;
      setErrorMessage(error.message);
      console.log("Login failed", error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="username">ชื่อผู้ใช้งาน</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="password">รหัสผ่าน</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button onClick={onLogin}>เข้าสู่ระบบ</button>
      {errorMessage}

      <Link href="/signup">Visit signup page</Link>
    </div>
  );
};

export default Login;
