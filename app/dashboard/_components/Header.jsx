"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

function Header() {
  const path = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href) => {
    // Add smooth page transition
    document.body.style.opacity = "0.8";
    setTimeout(() => {
      router.push(href);
      document.body.style.opacity = "1";
    }, 150);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 shadow-sm bg-secondary dark:bg-gray-800 dark:text-white transition-all duration-500 ease-in-out ${
        isScrolled
          ? "fixed top-0 left-0 right-0 z-50 shadow-xl backdrop-blur-md bg-secondary/90 dark:bg-gray-800/90 transform translate-y-0"
          : "relative transform translate-y-0"
      }`}
    >
      <div
        onClick={() => handleNavigation("/dashboard")}
        className="transition-all duration-300 cursor-pointer hover:scale-105 hover:drop-shadow-lg"
      >
        <Image
          src={"/logo-2.svg"}
          width={160}
          height={100}
          alt="logo"
          className="transition-all duration-300 hover:brightness-110"
        />
      </div>

      <ul className="hidden gap-6 md:flex">
        <li
          onClick={() => handleNavigation("/dashboard")}
          className={`relative px-3 py-2 rounded-lg transition-all duration-300 ease-out transform hover:scale-105 cursor-pointer 
            hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30
            hover:shadow-md hover:-translate-y-0.5 group
            ${
              path === "/dashboard"
                ? "text-blue-700 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                : "hover:text-blue-600 dark:hover:text-blue-400"
            }
          `}
        >
          Dashboard
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li
          onClick={() => handleNavigation("/dashboard/questions")}
          className={`relative px-3 py-2 rounded-lg transition-all duration-300 ease-out transform hover:scale-105 cursor-pointer 
            hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30
            hover:shadow-md hover:-translate-y-0.5 group
            ${
              path === "/dashboard/questions"
                ? "text-blue-700 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                : "hover:text-blue-600 dark:hover:text-blue-400"
            }
          `}
        >
          Questions
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li
          onClick={() => handleNavigation("/dashboard/upgrade")}
          className={`relative px-3 py-2 rounded-lg transition-all duration-300 ease-out transform hover:scale-105 cursor-pointer 
            hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30
            hover:shadow-md hover:-translate-y-0.5 group
            ${
              path === "/dashboard/upgrade"
                ? "text-blue-700 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                : "hover:text-blue-600 dark:hover:text-blue-400"
            }
          `}
        >
          Upgrade
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li
          onClick={() => handleNavigation("/dashboard/how")}
          className={`relative px-3 py-2 rounded-lg transition-all duration-300 ease-out transform hover:scale-105 cursor-pointer 
            hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30
            hover:shadow-md hover:-translate-y-0.5 group
            ${
              path === "/dashboard/how"
                ? "text-blue-700 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                : "hover:text-blue-600 dark:hover:text-blue-400"
            }
          `}
        >
          How it Works?
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <div className="transition-all duration-300 hover:scale-110">
          <ThemeToggle />
        </div>
        <div className="transition-all duration-300 hover:scale-110 hover:drop-shadow-md">
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
