"use client";
import React from "react";
import Header from "./_components/Header";
import PageTransition from "../_components/PageTransition";
import { AnimatePresence } from "framer-motion";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />

      <div className="mx-5 md:mx-20 lg:mx-36">
        <AnimatePresence mode="wait">
          <PageTransition>{children}</PageTransition>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DashboardLayout;
