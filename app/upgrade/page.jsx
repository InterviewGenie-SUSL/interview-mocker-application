"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Check,
  Crown,
  Star,
  Zap,
  Shield,
  Sparkles,
  ArrowLeft,
  Users,
  BarChart3,
  MessageSquare,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const UpgradePage = () => {
  const router = useRouter();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 mock interviews per month",
        "Basic AI feedback",
        "Standard question bank",
        "Email support",
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "month",
      description: "Best for serious job seekers",
      features: [
        "Unlimited mock interviews",
        "Advanced AI feedback",
        "Industry-specific questions",
        "Performance analytics",
        "Video recording & playback",
        "Priority support",
        "Custom interview scenarios",
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Dedicated support",
        "Training sessions",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false,
    },
  ];

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
    >
      <div className="p-6 mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-4 text-center">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Crown className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text">
              Upgrade Your Plan
            </h1>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-8 h-8 text-blue-500" />
            </motion.div>
          </div>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Choose the perfect plan to accelerate your interview preparation
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative rounded-2xl p-8 shadow-xl border-2 ${
                  plan.popular
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                    : "border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
                }`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute transform -translate-x-1/2 -top-4 left-1/2"
                  >
                    <div className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </motion.div>
                )}

                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <div className="mb-1 text-4xl font-bold">
                    {plan.price}
                    <span className="text-base font-normal text-gray-500">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      : ""
                  }`}
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <h2 className="mb-12 text-3xl font-bold text-center">
            Why Choose Pro?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "Unlimited Practice",
                description: "Practice as much as you want with no limits",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Track your progress with detailed insights",
              },
              {
                icon: MessageSquare,
                title: "AI Feedback",
                description: "Get personalized feedback on every answer",
              },
              {
                icon: Clock,
                title: "Priority Support",
                description: "Get help when you need it most",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-6 text-center bg-white shadow-lg rounded-xl dark:bg-gray-800"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UpgradePage;
