import React from "react";

import { Progress } from "antd";

const ProfileRating = () => {
  return (
    <Progress
      percent={80}
      strokeColor="#62c400"
      trailColor="#3478ff"
      type="circle"
    />
  );
};

export default ProfileRating;
