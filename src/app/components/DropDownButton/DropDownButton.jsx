import React from "react";
import { CIcon } from "@coreui/icons-react"; // Corrected import
import { twMerge } from 'tailwind-merge'; // Utility to merge classes intelligently

const DropDownButton = ({ children, open, toggle, type }) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center space-x-2 p-3 min-w-[50px] rounded-lg cursor-pointer transition duration-300 ease-in-out",
        "bg-white text-gray-600 shadow-md dark:bg-gray-800 dark:text-white",
        open && "border-2 border-blue-400 dark:border-blue-600"
      )}
      onClick={toggle}
    >
      {type === "Theme" ? (
        <CIcon icon={children} className="w-6 h-6" />
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default DropDownButton;
