import React from "react";

import { Progress } from "antd";

import style from "./ProfileRating.module.css";

const ProfileRating = (props) => {
  // 총 전적

  const matchCount = props.user.userInfo.matchCount;
  // 이긴 판수
  const winCount = props.user.userInfo.winCount;
  // 진 판
  const loseCount = matchCount - winCount;
  // 승률
  const percent = Math.floor((winCount / matchCount) * 100);
  return (
    <div className={style.background}>
      <span
        className={style.font}
      >{`${matchCount}전 ${winCount}승 ${loseCount}패`}</span>
      <Progress
        percent={percent}
        size={400}
        strokeColor="#62c400"
        trailColor="#3478ff"
        type="circle"
      />
    </div>
  );
};

export default ProfileRating;
