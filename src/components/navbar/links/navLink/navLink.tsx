"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }: any) => {
  const pathName = usePathname();
  return (
    <Link
      href={item.path}
      key={item.title}
      //   className={`${styles.container} ${
      //     pathName === item.path && styles.active
      //   }`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
