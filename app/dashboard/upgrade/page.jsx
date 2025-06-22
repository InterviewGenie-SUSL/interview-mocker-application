"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  FaCheck,
  FaCrown,
  FaRocket,
  FaStar,
  FaUsers,
  FaShield,
  FaHeadset,
  FaChartLine,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for trying out our services",
    features: [
      "3 Mock Interviews per month",
      "Basic AI feedback",
      "Text-based interviews",
      "Basic question bank",
      "Email support",
    ],
    buttonText: "Current Plan",
    isPopular: false,
    color: "from-gray-400 to-gray-500",
    icon: FaUsers,
    badge: "Starter",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Best for professional interview preparation",
    features: [
      "Unlimited Mock Interviews",
      "Advanced AI feedback with detailed analysis",
      "Video interviews with recording",
      "Extensive question bank (500+ questions)",
      "Custom interview scenarios",
      "Performance analytics & progress tracking",
      "Priority support",
      "Interview scheduling",
      "Export reports to PDF",
    ],
    buttonText: "Upgrade to Pro",
    isPopular: true,
    color: "from-blue-500 to-purple-600",
    icon: FaRocket,
    badge: "Most Popular",
    discount: "Save 20%",
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    period: "",
    description: "For teams and organizations",
    features: [
      "All Pro features",
      "Team management dashboard",
      "Custom integrations & API access",
      "Dedicated account manager",
      "Custom branding & white-label",
      "Advanced analytics & reporting",
      "Bulk licenses with volume discounts",
      "SSO integration",
      "24/7 premium support",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
    color: "from-purple-600 to-indigo-700",
    icon: FaCrown,
    badge: "Enterprise",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    text: "This platform helped me land my dream job! The AI feedback was incredibly detailed and helped me improve my interview skills significantly.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    text: "The mock interviews felt so realistic. I was well-prepared for my actual interviews thanks to this platform.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emily Davis",
    role: "Data Scientist",
    company: "Netflix",
    text: "The detailed analytics helped me track my progress and identify areas for improvement. Highly recommended!",
    rating: 5,
    avatar: "ED",
  },
];

function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [isYearly, setIsYearly] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const handleUpgrade = (planName) => {
    if (planName === "Enterprise") {
      window.location.href =
        "mailto:enterprise@interviewgenie.com?subject=Enterprise Plan Inquiry";
    } else if (planName !== "Free") {
      console.log(`Upgrading to ${planName} plan`);
      // Implement payment flow here
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaRocket className="w-4 h-4" />
            Limited Time Offer - 20% Off Pro Plan!
          </motion.div>

          <motion.h1
            className="mb-6 text-6xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Upgrade Your Interview Game
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-300"
          >
            Choose the perfect plan to enhance your interview preparation and
            land your dream job
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span
              className={`text-lg font-medium ${
                !isYearly ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <motion.button
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isYearly ? "bg-blue-600" : "bg-gray-300"
              }`}
              onClick={() => setIsYearly(!isYearly)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute w-6 h-6 bg-white rounded-full shadow-md top-1 left-1"
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.button>
            <span
              className={`text-lg font-medium ${
                isYearly ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Yearly
            </span>
            {isYearly && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full"
              >
                Save 25%!
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover="hover"
              className={`relative rounded-2xl p-8 border-2 transition-all duration-300 ${
                plan.isPopular
                  ? "border-blue-500 shadow-2xl shadow-blue-100 dark:shadow-blue-900/20 bg-white dark:bg-gray-800"
                  : selectedPlan === plan.name
                  ? "border-purple-400 shadow-xl bg-white dark:bg-gray-800"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300"
              }`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <motion.div
                  className="absolute transform -translate-x-1/2 -top-4 left-1/2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div
                    className={`bg-gradient-to-r ${plan.color} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}
                  >
                    <FaStar className="inline w-4 h-4 mr-1" />
                    {plan.badge}
                  </div>
                </motion.div>
              )}

              {/* Plan Header */}
              <div className="mb-8 text-center">
                {" "}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} mb-4`}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price === "Contact Us" ? "Custom" : plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-500 dark:text-gray-400">
                      {plan.period}
                    </span>
                  )}
                </div>
                {plan.discount && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block px-3 py-1 mb-2 text-sm font-medium text-orange-700 bg-orange-100 rounded-full"
                  >
                    {plan.discount}
                  </motion.div>
                )}
                <p className="text-gray-600 dark:text-gray-300">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5"
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaCheck className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </motion.div>
                    <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    plan.isPopular
                      ? `bg-gradient-to-r ${plan.color} hover:shadow-xl text-white`
                      : plan.name === "Free"
                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      : `bg-gradient-to-r ${plan.color} hover:shadow-xl text-white`
                  }`}
                  onClick={() => handleUpgrade(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Comparison */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700">
            <h2 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">
              Why Choose Our Platform?
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: FaChartLine,
                  title: "AI-Powered Analytics",
                  description:
                    "Get detailed insights into your performance with advanced AI analysis",
                },
                {
                  icon: FaShield,
                  title: "Secure & Private",
                  description:
                    "Your data is encrypted and secure. We never share your information",
                },
                {
                  icon: FaHeadset,
                  title: "24/7 Support",
                  description:
                    "Our team is here to help you succeed with round-the-clock support",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {" "}
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full dark:bg-blue-900"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 2,
                    }}
                  >
                    <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              What Our Users Say
            </h2>
            <motion.button
              className="font-medium text-blue-600 hover:text-blue-700"
              onClick={() => setShowTestimonials(!showTestimonials)}
              whileHover={{ scale: 1.05 }}
            >
              {showTestimonials ? "Hide" : "Show"} Testimonials
            </motion.button>
          </div>

          <AnimatePresence>
            {showTestimonials && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 gap-8 md:grid-cols-3"
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-6 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 font-semibold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-400">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                      ))}
                    </div>
                    <p className="italic text-gray-700 dark:text-gray-300">
                      "{testimonial.text}"
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            Need Help Choosing?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-300">
            Our team is here to help you find the perfect plan for your
            interview preparation needs
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 transition-colors duration-300 border-2 rounded-xl hover:border-blue-500 hover:text-blue-600"
                onClick={() =>
                  (window.location.href =
                    "mailto:support@interviewgenie.com?subject=Plan Recommendation")
                }
              >
                <FaHeadset className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="px-8 py-4 text-white shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                onClick={() =>
                  (window.location.href =
                    "https://calendly.com/interviewgenie/consultation")
                }
              >
                <FaRocket className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default UpgradePage;
