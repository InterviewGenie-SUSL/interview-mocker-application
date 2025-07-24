"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

// Reusable navigation item component - memoized to prevent unnecessary re-renders
const NavItem = React.memo(({ href, isActive, children }) => (
  <Link href={href} prefetch={true}>
    <li
      className={`relative transition-all duration-300 ease-in-out cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 z-10
        ${isActive ? "text-blue-700 dark:text-blue-300 font-bold" : ""}
      `}
    >
      {children}
    </li>
  </Link>
));

NavItem.displayName = "NavItem";

function Header() {
  const path = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 });
  const navRef = useRef(null);

  // Memoize navigation items to prevent recreation on every render
  const navigationItems = useMemo(
    () => [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/dashboard/questions", label: "Questions" },
      { href: "/dashboard/upgrade", label: "Upgrade" },
      { href: "/dashboard/how", label: "How it Works?" },
    ],
    []
  );

  // Memoize active index calculation
  const activeIndex = useMemo(
    () => navigationItems.findIndex((item) => item.href === path),
    [navigationItems, path]
  );

  // Optimized indicator position calculation with requestAnimationFrame
  const updateIndicatorPosition = useCallback(() => {
    if (activeIndex !== -1 && navRef.current) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const activeItem = navRef.current?.children[activeIndex];
        if (activeItem) {
          setIndicatorStyle({
            left: activeItem.offsetLeft,
            width: activeItem.offsetWidth,
            opacity: 1,
          });
        }
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeIndex]);

  useEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);

  return (
    <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white shadow-sm dark:bg-gray-800 dark:text-white backdrop-blur-lg">
      <Link href="/dashboard" prefetch={true}>
        <Image src="/logo-2.svg" width={160} height={100} alt="logo" priority />
      </Link>

      <div className="relative hidden md:block">
        <div
          className="absolute top-0 h-full transition-all duration-300 ease-out bg-blue-100 rounded-full dark:bg-blue-900/30"
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

      <div className="flex items-center gap-4 p-2 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
