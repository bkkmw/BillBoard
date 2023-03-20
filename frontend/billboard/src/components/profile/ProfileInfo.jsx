import React from "react";
import ProfilButton from "./ProfilButton";
import ProfileExp from "./ProfileExp";
import ProfileFriendsList from "./ProfileFriendsList";
import ProfileSearch from "./ProfileSearch";

const ProfileInfo = () => {
  return (
    <div>
      <img alt="이미지"></img>
      <div>
        <span>{`lv 100 황산나래 LG CNS`}</span>
        <ProfileExp />
        <ProfileFriendsList />
      </div>
      <ProfilButton />
      <ProfileSearch />
    </div>
  );
};

export default ProfileInfo;
