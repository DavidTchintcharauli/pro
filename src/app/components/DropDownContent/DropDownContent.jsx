import React from "react";
import "./DropDownContent.css";
import DropDownItem from "../DropDownItem/DropDownItem";

const DropDownContent = ({ children, open, onSelect, toggleHandler, type }) => {
  return (
    <div className={open ? "dropdown-cnt content-open" : "dropdown-cnt"}>
      {
        <>
          {children.map((options) => (
            <DropDownItem
              onClick={onSelect}
              key={options.label}
              toggleHandler={toggleHandler}
              type={type}
            >
              {options}
            </DropDownItem>
          ))}
        </>
      }
    </div>
  );
};

export default DropDownContent;
