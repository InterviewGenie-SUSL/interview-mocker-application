"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

function Header() {
  const path = usePathname();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Link href="/dashboard">
        <Image src={"/logo-2.svg"} width={160} height={100} alt="logo" />
      </Link>

      <ul className="hidden md:flex gap-6">
        <Link href="/dashboard">
          <li
            className={`hover:text-blue-700 hover:font-bold transition cursor-pointer
            ${path === "/dashboard" && "text-blue-700 font-bold"}
          `}
          >
            Dashboard
          </li>
        </Link>
        <Link href="/dashboard/questions">
          <li
            className={`hover:text-blue-700 hover:font-bold transition cursor-pointer
            ${path === "/dashboard/questions" && "text-blue-700 font-bold"}
          `}
          >
            Questions
          </li>
        </Link>
        <Link href="/dashboard/upgrade">
          <li
            className={`hover:text-blue-700 hover:font-bold transition cursor-pointer
            ${path === "/dashboard/upgrade" && "text-blue-700 font-bold"}
          `}
          >
            Upgrade
          </li>
        </Link>
        <Link href="/dashboard/how">
          <li
            className={`hover:text-blue-700 hover:font-bold transition cursor-pointer
            ${path === "/dashboard/how" && "text-blue-700 font-bold"}
          `}
          >
            How it Works?
          </li>
        </Link>
      </ul>

      <UserButton />
    </div>
  );
}

export default Header;
