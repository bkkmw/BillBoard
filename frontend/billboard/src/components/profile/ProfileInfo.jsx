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
  // const [cat, setCat] = useState({});

  // axios({
  //   method: "get",
  //   url: "https://cataas.com/cat",
  // })
  //   .then((res) => {
  //     setCat(res.data);
  //   })
  //   .catch((eroor) => {
  //     Navigate("/error");
  //   });

  return (
    <div className={style.background}>
      <img alt="이미지"></img>
      <div className={style.background2}>
        <span className={style.fontsize}>{`Lv 100 황산나래 LG CNS`}</span>
        <ProfileExp />
        <ProfileFollowing />
        <ProfileFollower />
        <Det />
        <ProfilButton />
        <ProfileSearch />
      </div>
    </div>
  );
};

export default ProfileInfo;
