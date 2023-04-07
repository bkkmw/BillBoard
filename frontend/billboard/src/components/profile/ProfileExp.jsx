import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Progress, Space } from "antd";
import { Grid } from "@mui/material";
const ProfileExp = (props) => {
  // 레벨링 시스템

  const experience = props.user.userInfo.experience;
  console.log(props.user)
  let total = experience;
  let start = 15;
  let level = 0;
  let x, need;
  while (total >= 0) {
    need = start;
    total -= need;
    level++;
    start = Math.pow(start, 1.2);
    x = need + total;
  }

  let result = 0;
  if (need !== 0) {
    result = ((x / need) * 100).toFixed(2);
  }
  return (
    <Grid>
      <div
        style={{
          display: "flex",
          fontSize: "1rem",
          fontWeight: " bold",
          justifyContent: "start",
        }}
      >
        <p>LV : {level}</p>
      </div>
      <div>
        <Progress
          percent={result}
          status="active"
          strokeColor={{
            from: "#108ee9",
            to: "#87d068",
          }}
          size={[window.innerWidth * 0.5, (window.innerWidth * 0.8) / 30]}
        ></Progress>
      </div>
    </Grid>
  );
};

export default ProfileExp;
export const LevelingSys = (exp) => {
  console.log(exp)
  const experience = exp
  let total = experience;
  let start = 15;
  let level = 0;
  let x, need;
  while (total >= 0) {
    need = start;
    total -= need;
    level++;
    start = Math.pow(start, 1.2);
    x = need + total;
  }

  let result = 0;
  if (need !== 0) {
    result = ((x / need) * 100).toFixed(2);
  }
  return level
}
