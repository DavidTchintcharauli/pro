import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import React from "react";

export default function muscleGoalButtonGroup({
  userInfo,
  handleChange,
  muscleGoalData,
}) {
  return (
    <div className="flex flex-col w-1/2 h-3/5 rounded-2xl m-5 items-center border justify-center bg-gray-400 bg-opacity-20 ">
      <label className="font-serif font-semibold">
        Your primary goal is to:{" "}
      </label>
      <ToggleButtonGroup
        className="bg-blue-400"
        size="large"
        value={userInfo.muscleGoal}
        exclusive
        onChange={(e, value) => handleChange("muscleGoal", value)}
        aria-label="Platform"
      >
        {muscleGoalData.map((goal) => {
          return (
            <ToggleButton
              key={goal}
              className="text-black hover:bg-gray-400"
              value={goal}
              style={{
                background: userInfo.muscleGoal === goal ? "white" : "#60A5FA",
              }}
            >
              {goal}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <label className="font-serif font-bold">Weight </label>
    </div>
  );
}
