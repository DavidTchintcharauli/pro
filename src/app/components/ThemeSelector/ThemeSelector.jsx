import React, { useState } from "react";
import ThemeSelectorButton from "../ThemeSelectorButton/ThemeSelectorButton";

export default function ThemeSelector() {
  const [open, setOpen] = useState(false);
  const toggleDropDown = () => {
    setOpen((open) => !open);
  };
  return (
    <div>
      {/* <ThemeSelectorButton onClick={toggleDropDown}></ThemeSelectorButton> */}
      <div></div>
    </div>
  );
}
