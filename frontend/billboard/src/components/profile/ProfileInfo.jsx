import React, { useState } from "react";

import ProfilButton from "./ProfilButton";
import ProfileExp from "./ProfileExp";
import ProfileFollowing from "./ProfileFollowing";
import ProfileSearch from "./ProfileSearch";
import ProfileFollower from "./ProfileFollower";

import style from "./ProfileInfo.module.css";
import axios from "axios";
import { Navigate } from "react-router";

import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import httpClient from "../../utils/axios";

const ProfileInfo = (props) => {
  // console.log("하이이잉", props.user.userInfo);
  const { loginUser } = useSelector((state) => state.user);
  const nickname = props.user.userInfo.nickname;
  const deleteUser = async () => {
    const userId = loginUser.userId;
    if (window.confirm("정말 회원 탈퇴하시겠습니까?")) {
      try {
        const response = await httpClient.delete(`users/${userId}`);
        console.log(response.data);
        if (response.data.status === 200) {
          alert("회원 탈퇴 되었습니다.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className={style.background}>
      <div className={style.background2}>
        <span className={style.fontsize}>{nickname}</span>
        <ProfileExp />
        <div className={style.background3}>
          <ProfileFollowing />
          <ProfileFollower />
          <Button
            onClick={deleteUser}
            style={{
              width: "6rem",
              height: "2.5rem",
              fontsize: "1.2rem",
            }}
          >
            회원 탈퇴
          </Button>
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
