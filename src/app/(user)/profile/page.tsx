"use client";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const auth: any = useAuth();
  console.log(auth?.username);
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const getUser = async () => {
      const username = await auth?.username;
      console.log("auth", auth?.username);

      const query = await fetch(`http://localhost:3000/api/users/${username}`);
      const response = await query.json();
      setUser(response.user);
    };
    getUser();
  }, [auth]);

  return (
    <div>
      Information
      <div>
        {user && (
          <>
            <span>รหัสประจำตัว</span>
            <span>ชื่อผู้ใช้</span>
            <span>
              ชื่อ {user?.firstName} นามสกุล {user?.lastName}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
