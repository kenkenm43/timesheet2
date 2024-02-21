"use client";
import React, { useState } from "react";
import NavLink from "./navLink/navLink";
// import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/router";
const links = [
  { title: "Homepage", path: "/" },
  { title: "Summary", path: "/summary" },
  { title: "Profile", path: "/profile" },
];

const Links = () => {
  const [open, setOpen] = useState(false);
  // const auth: any = useAuth();
  const router = useRouter();
  const session = true;
  // const isAdmin = auth?.roles?.includes("admin");

  return (
    <div>
      <div className="flex justify-between">
        {links.map((link, index) => (
          <NavLink item={link} key={index} />
        ))}
        {session ? (
          <>
            {/* {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />} */}
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      {/* <button onClick={() => setOpen((prev) => !prev)}>Menu</button> */}
      {/* {open && (
        <div>
          {links.map((link, index) => (
            <NavLink item={link} key={index} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Links;
