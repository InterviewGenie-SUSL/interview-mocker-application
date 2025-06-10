"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaCheck } from "react-icons/fa";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our services",
    features: [
      "3 Mock Interviews per month",
      "Basic AI feedback",
      "Text-based interviews",
      "Basic question bank",
    ],
    buttonText: "Current Plan",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "Best for professional interview preparation",
    features: [
      "Unlimited Mock Interviews",
      "Advanced AI feedback",
      "Video interviews with recording",
      "Extensive question bank",
      "Custom interview scenarios",
      "Performance analytics",
      "Priority support",
    ],
    buttonText: "Upgrade to Pro",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    description: "For teams and organizations",
    features: [
      "All Pro features",
      "Team management",
      "Custom integrations",
      "Dedicated support",
      "Custom branding",
      "API access",
      "Bulk licenses",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
  },
];

function UpgradePage() {
  return (
    <div className="p-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Upgrade Your Plan</h1>
        <p className="text-gray-600">
          Choose the perfect plan to enhance your interview preparation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-6 ${
              plan.isPopular
                ? "border-blue-600 shadow-lg shadow-blue-100"
                : "border-gray-200"
            }`}
          >
            {plan.isPopular && (
              <div className="text-blue-600 text-sm font-medium mb-2">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <div className="mt-2 text-3xl font-bold">{plan.price}</div>
            <p className="text-gray-500 mt-2">{plan.description}</p>

            <ul className="mt-6 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full mt-8 ${
                plan.isPopular
                  ? "bg-blue-600 hover:bg-blue-700"
                  : plan.name === "Free"
                  ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  : ""
              }`}
              variant={plan.name === "Free" ? "outline" : "default"}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
        <p className="text-gray-600 mb-4">
          Contact our team for a personalized recommendation
        </p>
        <Button variant="outline">Contact Support</Button>
      </div>
    </div>
  );
}

export default UpgradePage;
