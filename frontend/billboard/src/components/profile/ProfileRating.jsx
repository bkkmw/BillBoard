import React from "react";

import { Progress } from "antd";

import style from "./ProfileRating.module.css";

const ProfileRating = () => {
  return (
    <div className={style.background}>
      <span>전적</span>
      <Progress
        percent={80}
        size={500}
        strokeColor="#62c400"
        trailColor="#3478ff"
        type="circle"
      />
    </div>
  );
};

export default ProfileRating;
