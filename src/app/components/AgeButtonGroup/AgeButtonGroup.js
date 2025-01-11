import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { useLocale } from "../providers/LanguageContext";

export default function AgeButtonGroup({ ageData, userInfo, handleChange }) {
  const { chatWindow } = useLocale();

  return (
    <div>
      <FormControl color="neutral" className="bg-white " fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userInfo.age}
          onChange={(e, value) => {
            handleChange("age", value.props.value);
          }}
        >
          <MenuItem key="Age" value={chatWindow.Age}>
            <em>{chatWindow.Age}</em>
          </MenuItem>
          {ageData.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                <em>{item}</em>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
