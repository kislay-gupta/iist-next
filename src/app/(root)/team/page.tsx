import React from 'react';

export default function TeamPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Coming Soon</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">Our team page is under construction. Stay tuned for updates!</p>
        <div className="animate-bounce">
          <div className="w-16 h-16 mx-auto border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );
}