import React from "react";

import { Progress } from "antd";

import style from "./ProfileRating.module.css";

const ProfileRating = () => {
  return (
    <div className={style.background}>
      <span className={style.font}>10전 8승 2패</span>
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
