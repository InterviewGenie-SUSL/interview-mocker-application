"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

function Header() {
  const path = usePathname();

  return (
    <div className="flex items-center justify-between p-4 shadow-sm bg-secondary dark:bg-gray-800 dark:text-white">
      <Link href="/dashboard">
        <Image src={"/logo-2.svg"} width={160} height={100} alt="logo" />
      </Link>

      <ul className="hidden gap-6 md:flex">
        <Link href="/dashboard">
          <li
            className={`transition-all duration-300 transform hover:scale-105 hover:text-blue-700 hover:font-bold cursor-pointer
            ${path === "/dashboard" && "text-blue-700 font-bold"}
          `}
          >
            Dashboard
          </li>
        </Link>
        <Link href="/dashboard/questions">
          <li
            className={`transition-all duration-300 transform hover:scale-105 hover:text-blue-700 hover:font-bold cursor-pointer
            ${path === "/dashboard/questions" && "text-blue-700 font-bold"}
          `}
          >
            Questions
          </li>
        </Link>
        <Link href="/dashboard/upgrade">
          <li
            className={`transition-all duration-300 transform hover:scale-105 hover:text-blue-700 hover:font-bold cursor-pointer
            ${path === "/dashboard/upgrade" && "text-blue-700 font-bold"}
          `}
          >
            Upgrade
          </li>
        </Link>
        <Link href="/dashboard/how">
          <li
            className={`transition-all duration-300 transform hover:scale-105 hover:text-blue-700 hover:font-bold cursor-pointer
            ${path === "/dashboard/how" && "text-blue-700 font-bold"}
          `}
          >
            How it Works?
          </li>
        </Link>
      </ul>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
