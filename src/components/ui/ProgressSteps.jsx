"use client";
import React from "react";

export default function ProgressSteps({ steps = [] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={step.id || index}
          className={`flex items-center gap-3 p-3 rounded-lg
            ${step.active ? "bg-white/20" : "bg-white/10"}
            ${step.completed ? "opacity-100" : "opacity-70"}
          `}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
              ${step.completed ? "bg-green-500" : "bg-white/30"}
            `}
          >
            {index + 1}
          </div>
          <span className="text-white text-sm font-medium">
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
}
