"use client";
import React from "react";
import "./DropDownItem.css";
import { CIcon } from "@coreui/icons-react";

const DropDownItem = ({ children, onClick, toggleHandler, type }) => {
  const clickHandler = () => {
    onClick();
    if (type === "Sorter") {
      toggleHandler(children.option, children.order);
    }
    if (type === "Theme") {
      children.changeTheme();
      toggleHandler();
    }
  };

  return (
    <div
      className="dropdown-item"
      onClick={() => {
        clickHandler();
      }}
    >
      {type === "Sorter" ? (
        children.label
      ) : (
        <CIcon icon={children.icon}></CIcon>
      )}
    </div>
  );
};

export default DropDownItem;
