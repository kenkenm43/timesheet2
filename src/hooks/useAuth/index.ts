"use client";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { verifyJwtToken } from "@/libs/auth";

export function useAuth() {
  const [auth, setAuth] = useState(null);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token") ?? null;
    const verifiedToken: any = await verifyJwtToken(token);
    setAuth(verifiedToken);
  };
  useEffect(() => {
    getVerifiedtoken();
  }, []);
  return auth;
}
