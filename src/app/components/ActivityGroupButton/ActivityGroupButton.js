import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

export default function ActivityGroupButton({
  activityData,
  userInfo,
  handleChange,
}) {
  return (
    <div>
      <h1 className="font-serif">How many days a week do you exercise?</h1>
      <div className="w-1/2">
        <FormControl color="neutral" className="bg-white " fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userInfo.activity}
            onChange={(e, value) => {
              // console.log(value.props.value);
              handleChange("activity", value.props.value);
            }}
          >
            {activityData.map((item) => (
              <MenuItem key={item} value={item}>
                <em>{item}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
