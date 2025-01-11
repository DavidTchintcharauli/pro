import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { useLocale } from "../providers/LanguageContext";

export default function WeightGroupButton({
  handleChange,
  userInfo,
  weightData,
}) {
  const { chatWindow } = useLocale();
  return (
    <div>
      <h1 className="font-serif">Please specify your weight in KGs</h1>
      <div className=" w-1/2 ">
        <FormControl color="neutral" className="bg-white " fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userInfo.weight}
            onChange={(e, value) => {
              handleChange("weight", value.props.value);
            }}
          >
            <MenuItem key={chatWindow.Weight} value={chatWindow.Weight}>
              <em>{chatWindow.Weight}</em>
            </MenuItem>
            {weightData.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
