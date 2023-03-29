import React, { useState } from "react";

import ProfilButton from "./ProfilButton";
import ProfileExp from "./ProfileExp";
import ProfileFollowing from "./ProfileFollowing";
import ProfileSearch from "./ProfileSearch";
import ProfileFollower from "./ProfileFollower";
import Det from "./Det";

import style from "./ProfileInfo.module.css";
import axios from "axios";
import { Navigate } from "react-router";

const ProfileInfo = () => {
  return (
    <div className={style.background}>
      <div className={style.background2}>
        <span className={style.fontsize}>{`Lv 100 황산나래 LG CNS`}</span>
        <ProfileExp />
        <div className={style.background3}>
          <ProfileFollowing />
          <ProfileFollower />
          <Det />
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
