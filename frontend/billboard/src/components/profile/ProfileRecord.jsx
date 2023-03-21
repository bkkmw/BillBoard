import React from "react";

import ProfileLatestList from "./ProfileLatestList";
import ProfileRating from "./ProfileRating";

import style from "./ProfileRecord.module.css";

const ProfileRecord = () => {
  return (
    <div className={style.background}>
      <ProfileRating />
      <ProfileLatestList />
    </div>
  );
};

export default ProfileRecord;
