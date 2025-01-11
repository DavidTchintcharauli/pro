"use client";
import React from "react";

function Welcome({ params: { lang } }) {
  return (
    <main className="max-w-full overflow-x-hidden m-0">
    <div className="flex items-center justify-center min-h-screen bg-neutral-200 dark:bg-neutral-900">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Welcome to Our App!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We're glad to have you here. Explore and enjoy our features.
        </p>
      </div>
    </div>
    </main>
  );
}

export default Welcome;
