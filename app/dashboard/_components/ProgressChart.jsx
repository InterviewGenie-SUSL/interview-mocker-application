"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Award, Target, BadgeCheck } from "lucide-react";

const ProgressChart = ({ interviews = [] }) => {
  // Generate mock data for charts
  const skillData = [
    { name: "Technical", value: 85, color: "#3B82F6" },
    { name: "Behavioral", value: 92, color: "#8B5CF6" },
    { name: "Communication", value: 78, color: "#10B981" },
    { name: "Problem Solving", value: 88, color: "#F59E0B" },
  ];

  const monthlyProgress = [
    { month: "Jan", completed: 12, target: 15 },
    { month: "Feb", completed: 18, target: 20 },
    { month: "Mar", completed: 25, target: 25 },
    { month: "Apr", completed: 22, target: 30 },
    { month: "May", completed: 35, target: 35 },
    { month: "Jun", completed: 28, target: 40 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const [showProMsg, setShowProMsg] = React.useState("");
  // Handler for PRO badge click
  const handleProClick = (e) => {
    e.stopPropagation();
    setShowProMsg("Upgrade to Pro to activate this feature!");
    setTimeout(() => setShowProMsg(""), 2500);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Breakdown */}
        <motion.div
          variants={itemVariants}
          className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer group"
          onClick={handleProClick}
        >
          {showProMsg && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 rounded-2xl">
              <div className="px-6 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-lg text-lg font-semibold border border-yellow-400 flex items-center gap-2 animate-fade-in">
                <BadgeCheck className="w-5 h-5 text-yellow-500" />
                {showProMsg}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-purple-600" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              Skill Distribution
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 ml-2 text-xs font-semibold rounded bg-gradient-to-r from-yellow-400 to-orange-500 text-white cursor-pointer group-hover:scale-105 transition-transform"
                title="Upgrade to Pro"
              >
                <BadgeCheck className="w-4 h-4" /> PRO
              </span>
            </h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly Goals */}
        <motion.div
          variants={itemVariants}
          className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer group"
          onClick={handleProClick}
        >
          {showProMsg && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 rounded-2xl">
              <div className="px-6 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-lg text-lg font-semibold border border-yellow-400 flex items-center gap-2 animate-fade-in">
                <BadgeCheck className="w-5 h-5 text-yellow-500" />
                {showProMsg}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-green-600" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              Monthly Goals
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 ml-2 text-xs font-semibold rounded bg-gradient-to-r from-yellow-400 to-orange-500 text-white cursor-pointer group-hover:scale-105 transition-transform"
                title="Upgrade to Pro"
              >
                <BadgeCheck className="w-4 h-4" /> PRO
              </span>
            </h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Achievement Summary */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center gap-2 mb-6">
            <div>
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold">Achievements</h4>
          </div>

          <div className="space-y-4">
            <motion.div
              className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm">Interviews Completed</span>
              <span className="text-xl font-bold">{interviews.length}</span>
            </motion.div>

            <motion.div
              className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm">Average Score</span>
              <span className="text-xl font-bold">87%</span>
            </motion.div>

            <motion.div
              className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm">Best Performance</span>
              <span className="text-xl font-bold">95%</span>
            </motion.div>

            <motion.div
              className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm">Streak Days</span>
              <span className="text-xl font-bold">7</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProgressChart;
