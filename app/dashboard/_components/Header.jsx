"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

// Reusable navigation item component
const NavItem = ({ href, isActive, children, onMouseEnter, onMouseLeave }) => (
  <Link href={href}>
    <li
      className={`relative transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 z-10
        ${isActive && "text-blue-700 dark:text-blue-300 font-bold"}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </li>
  </Link>
);

function Header() {
  const path = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/questions", label: "Questions" },
    { href: "/dashboard/upgrade", label: "Upgrade" },
    { href: "/dashboard/how", label: "How it Works?" },
  ];

  useEffect(() => {
    const activeIndex = navigationItems.findIndex((item) => item.href === path);
    if (activeIndex !== -1 && navRef.current) {
      const activeItem = navRef.current.children[activeIndex];
      if (activeItem) {
        setIndicatorStyle({
          left: activeItem.offsetLeft,
          width: activeItem.offsetWidth,
          opacity: 1,
        });
      }
    }
  }, [path]);

  return (
    <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white shadow-sm dark:bg-gray-800 dark:text-white backdrop-blur-lg">
      <Link href="/dashboard">
        <Image src={"/logo-2.svg"} width={160} height={100} alt="logo" />
      </Link>

      <div className="relative hidden md:block">
        <div
          className="absolute top-0 h-full transition-all duration-500 ease-in-out bg-blue-100 rounded-full dark:bg-blue-900/30"
          style={indicatorStyle}
        />
        <ul ref={navRef} className="relative flex gap-6">
          {navigationItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              isActive={path === item.href}
            >
              {item.label}
            </NavItem>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4 p-2 transition rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
