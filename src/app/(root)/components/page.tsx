import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Components || IIST Bihar",
  description: "We're crafting beautiful components for you. Stay tuned!",
};
export default function ComponentsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100">
      <div className="max-w-2xl mx-auto text-center px-6">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text mb-4">
            Components
          </h1>
          <div className="text-3xl font-semibold text-gray-700 mb-2">
            Coming Soon
          </div>
          <p className="text-xl text-gray-600">
            We&apos;re crafting beautiful components for you. Stay tuned!
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-purple-500 rounded-full border-b-transparent animate-spin-slow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
