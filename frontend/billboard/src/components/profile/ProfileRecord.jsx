import React from "react";
import ProfileLatestList from "./ProfileLatestList";
import ProfileRating from "./ProfileRating";

const ProfileRecord = () => {
  return (
    <div>
      <ProfileRating />
      <ProfileLatestList />
    </div>
  );
};

export default ProfileRecord;
