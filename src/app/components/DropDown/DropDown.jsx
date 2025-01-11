"use client";
import React, { useState } from "react";
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import "./DropDown.css";

const DropDown = ({ buttonText, content, toggleHandler, type }) => {
  const [open, setOpen] = useState(false);
  const toggleDropDown = () => {
    setOpen((open) => !open);
  };

  return (
    <div>
      <DropDownButton toggle={toggleDropDown} open={open} type={type}>
        {buttonText}
      </DropDownButton>
      <DropDownContent
        className="z-10"
        onSelect={toggleDropDown}
        open={open}
        toggleHandler={toggleHandler}
        type={type}
      >
        {content}
      </DropDownContent>
    </div>
  );
};

export default DropDown;
