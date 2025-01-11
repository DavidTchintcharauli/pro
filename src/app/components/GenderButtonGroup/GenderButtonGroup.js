import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function GenderButtonGroup({
  genderData,
  userInfo,
  handleChange,
}) {
  return (
    <div>
      <label className="font-serif font-bold mr-2">Gender: </label>
      <ToggleButtonGroup
        orientation="vertical"
        className="bg-blue-400"
        size="small"
        value={userInfo.gender}
        exclusive
        onChange={(e, value) => handleChange("gender", value)}
        aria-label="Platform"
      >
        {genderData.map((item) => (
          <ToggleButton
            key={item}
            style={{
              background: userInfo.gender === item ? "White" : "#60A5FA",
            }}
            className="text-black hover:bg-gray-400"
            value={item}
          >
            {item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
