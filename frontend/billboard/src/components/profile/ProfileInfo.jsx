import React, { useState } from "react";

import ProfilButton from "./ProfilButton";
import ProfileExp from "./ProfileExp";
import ProfileFollowing from "./ProfileFollowing";
import ProfileSearch from "./ProfileSearch";
import ProfileFollower from "./ProfileFollower";

import style from "./ProfileInfo.module.css";
import axios from "axios";
import { Navigate } from "react-router";

const ProfileInfo = (props) => {
  // console.log("하이이잉", props.user.userInfo);
  const nickname = props.user.userInfo.nickname;
  return (
    <div className={style.background}>
      <div className={style.background2}>
        <span className={style.fontsize}>{nickname}</span>
        <ProfileExp />
        <div className={style.background3}>
          <ProfileFollowing />
          <ProfileFollower />
        </div>
      </div>
      <div className={style.background4}>
        <ProfilButton />
        <ProfileSearch />
      </div>
    </div>
  );
};

export default ProfileInfo;
