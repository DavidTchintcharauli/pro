import React from "react";
import { ClipLoader } from "react-spinners";

export default function AuthenticationButton({ href, type, buttonText }) {
  return buttonText === "Loading" ? (
    <div className="flex items-center justify-center space-x-2 h-12 px-6 bg-gray-400 dark:bg-gray-600 rounded-full text-white cursor-wait transition duration-300 ease-in-out">
      <ClipLoader color="white" size={20} />
      <span className="text-sm">Loading...</span>
    </div>
  ) : (
    <a href={href}>
      <button className="flex items-center justify-center h-12 px-6 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
        {buttonText}
      </button>
    </a>
  );
}
