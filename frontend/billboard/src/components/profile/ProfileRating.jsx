import React from "react";
import { Progress } from "antd";

const ProfileRating = () => {
  return (
    <Progress
      type="circle"
      percent={80}
      strokeColor="#62c400"
      trailColor="#3478ff"
    />
  );
};

export default ProfileRating;
