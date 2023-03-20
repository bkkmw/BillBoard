import React from "react";

import { Progress, Space } from "antd";

const ProfileExp = () => {
  return (
    <Progress
      // 나중에 exp를 가져오면 percent에 넣으면 됨
      percent={70}
      status="active"
      strokeColor={{
        from: "#108ee9",
        to: "#87d068",
      }}
    />
  );
};

export default ProfileExp;
