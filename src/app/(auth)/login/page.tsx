"use client";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/app/loading";

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
      if (user.username === "") return setErrorMessage("โปรดกรอกชื่อผู้ใช้");
      if (user.password === "") return setErrorMessage("ใส่รหัสผ่านด้วย");
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        user
      );
      router.replace("/");
    } catch (error: any) {
      const { message } = error.response.data;
      console.log(message);

      setErrorMessage(message);
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
        placeholder="ชื่อผู้ใช้งาน"
      />
      <label htmlFor="password">รหัสผ่าน</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="รหัสผ่าน"
      />
      {loading ? (
        <Loading />
      ) : (
        <button onClick={onLogin} disabled={loading}>
          เข้าสู่ระบบ
        </button>
      )}
      {errorMessage}

      <Link href="/register">ไปหน้าลงทะเบียน</Link>
    </div>
  );
};

export default Login;
