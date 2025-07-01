"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Plus,
  BookOpen,
  Target,
  Star,
  BarChart3,
  Users,
  Crown,
  Sparkles,
  PlayCircle,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddNewInterview from "./AddNewInterview";
import InterviewList from "./InterviewList";
import ProgressChart from "./ProgressChart";
import FloatingActionButton from "./FloatingActionButton";
import Link from "next/link";

const Dashboard = () => {
  const { user } = useUser();
  const [interviewData, setInterviewData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    thisWeek: 0,
    completed: 0,
    avgScore: 85,
  });

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  useEffect(() => {
    filterInterviews();
  }, [searchTerm, filterBy, interviewData]);

  const GetInterviewList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdby, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      setInterviewData(result);
      calculateStats(result);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const thisWeekCount = data.filter((interview) => {
      const createdDate = new Date(interview.createdAt);
      return createdDate >= oneWeekAgo;
    }).length;

    setStats({
      total: data.length,
      thisWeek: thisWeekCount,
      completed: data.length,
      avgScore: 85 + Math.floor(Math.random() * 15),
    });
  };

  const filterInterviews = () => {
    let filtered = interviewData;

    if (searchTerm) {
      filtered = filtered.filter(
        (interview) =>
          interview.jobPosition
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          interview.jobDesc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy !== "all") {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      switch (filterBy) {
        case "recent":
          filtered = filtered.filter((interview) => {
            const createdDate = new Date(interview.createdAt);
            return createdDate >= oneWeekAgo;
          });
          break;
        case "month":
          filtered = filtered.filter((interview) => {
            const createdDate = new Date(interview.createdAt);
            return createdDate >= oneMonthAgo;
          });
          break;
        default:
          break;
      }
    }

    setFilteredData(filtered);
  };

  const handleDeleteInterview = async (mockId) => {
    try {
      // Add delete functionality here
      setInterviewData((prev) =>
        prev.filter((interview) => interview.mockId !== mockId)
      );
      setFilteredData((prev) =>
        prev.filter((interview) => interview.mockId !== mockId)
      );
    } catch (error) {
      console.error("Error deleting interview:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const statCards = [
    {
      title: "Total Interviews",
      value: stats.total,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      change: "+12%",
    },
    {
      title: "This Week",
      value: stats.thisWeek,
      icon: Calendar,
      color: "from-green-500 to-green-600",
      change: "+8%",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: Target,
      color: "from-purple-500 to-purple-600",
      change: "+15%",
    },
    {
      title: "Avg Score",
      value: `${stats.avgScore}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      change: "+5%",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
    >
      <div className="p-6 mx-auto space-y-8 max-w-7xl">
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text">
              Welcome back, {user?.firstName}!
            </h1>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-8 h-8 text-blue-500" />
            </motion.div>
          </div>
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300"
          >
            Ready to ace your next interview? Let's practice and build your
            confidence!
          </motion.p>
        </motion.div>
        {/* User Plan Banner */}
        <motion.div variants={itemVariants}>
          <motion.div
            className="relative p-8 overflow-hidden text-white shadow-2xl rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-700/20"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(37, 99, 235, 0.2), rgba(67, 56, 202, 0.2))",
                  "linear-gradient(135deg, rgba(67, 56, 202, 0.2), rgba(147, 51, 234, 0.2), rgba(37, 99, 235, 0.2))",
                  "linear-gradient(225deg, rgba(37, 99, 235, 0.2), rgba(67, 56, 202, 0.2), rgba(147, 51, 234, 0.2))",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
                >
                  <Crown className="w-8 h-8" />
                </motion.div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold">Pro Plan Active</h3>
                  <p className="text-white/80">
                    Unlimited interviews • AI feedback • Premium features
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/dashboard/upgrade">
                  <Button
                    variant="secondary"
                    className="text-white bg-white/20 hover:bg-white/30 border-white/30"
                  >
                    Upgrade Plan
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                variants={cardVariants}
                whileHover="hover"
                className="relative p-6 overflow-hidden bg-white border border-gray-200 shadow-lg rounded-xl dark:bg-gray-800 dark:border-gray-700"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}
                  animate={{ opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Add New Interview Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-md"
          >
            <AddNewInterview />
          </motion.div>

          {/* Upgrade Plan Button */}
          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/dashboard/upgrade">
              <Button
                size="lg"
                className="h-12 px-8 font-semibold text-white shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Crown className="w-5 h-5 mr-2" />
                Upgrade Plan
              </Button>
            </Link>
          </motion.div> */}
        </motion.div>
        {/* Search and Filter */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <Input
              placeholder="Search interviews by position or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 pl-10 transition-colors duration-300 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <motion.select
              whileHover={{ scale: 1.02 }}
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-3 transition-colors duration-300 bg-white border-2 border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="recent">This Week</option>
              <option value="month">This Month</option>
            </motion.select>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="icon" className="w-12 h-12">
                <Filter className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>{" "}
        {/* Previous Interview Cards */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-2 text-3xl font-bold text-gray-900 dark:text-white">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              Your Interview History
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredData.length} interview
              {filteredData.length !== 1 ? "s" : ""} found
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="h-4 mb-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <div className="h-3 mb-2 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <div className="w-2/3 h-3 bg-gray-200 rounded dark:bg-gray-700"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <InterviewList
              interviews={filteredData}
              onDelete={handleDeleteInterview}
            />
          )}
        </motion.div>{" "}
        {/* Progress Chart */}
        <motion.div variants={itemVariants}>
          <ProgressChart interviews={interviewData} />
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </motion.div>
  );
};

export default Dashboard;
