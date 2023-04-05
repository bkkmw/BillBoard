import React from "react";

import ProfileLatestList from "./ProfileLatestList";
import ProfileRating from "./ProfileRating";

import style from "./ProfileRecord.module.css";

const ProfileRecord = (props) => {
  return (
    <div className={style.background}>
      <ProfileRating user={props.user} />
      <ProfileLatestList user={props.user} />
    </div>
  );
};

export default ProfileRecord;
