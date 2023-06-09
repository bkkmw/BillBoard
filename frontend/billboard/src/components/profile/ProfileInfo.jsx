import React, { useState, useEffect } from "react";

import ProfilButton from "./ProfilButton";
import ProfileExp from "./ProfileExp";
import ProfileFollowing from "./ProfileFollowing";
import ProfileSearch from "./ProfileSearch";
import ProfileFollower from "./ProfileFollower";

import style from "./ProfileInfo.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

import { Link, useRouteLoaderData } from "react-router-dom";

import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import httpClient from "../../utils/axios";

const ProfileInfo = (props) => {
  const userId = useRouteLoaderData("profile");
  const user = props.user;
  const [myprofile, setMyProfile] = useState(true);
  const navigate = useNavigate();
  const { loginUser } = useSelector((state) => state.user);
  const nickname = props.user.userInfo.nickname;
  const username = props.user.userInfo.userId;
  const deleteUser = async () => {
    const userId = loginUser.userId;
    if (window.confirm("정말 회원 탈퇴하시겠습니까?")) {
      try {
        const response = await httpClient.delete(`users/${userId}`);
        // console.log(response.data);
        if (response.data.status === 200) {
          alert("회원 탈퇴 되었습니다.");
          navigate("/login");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    if (loginUser.userId === userId) {
      setMyProfile(true);
    } else {
      setMyProfile(false);
    }
  }, [userId]);
  return (
    <div className={style.background}>
      <div style={{ width: "75vw" }} className={style.background2}>
        <span className={style.fontsize}>
          {nickname ? `닉네임 : ${nickname}` : `ID : ${username}`}
        </span>
        <ProfileExp user={user} />
        <div className={style.background3}>
          <ProfileFollowing />
          <ProfileFollower />
          {myprofile && (
            <Button onClick={deleteUser} sx={{ color: "red" }}>
              회원 탈퇴
            </Button>
          )}
          <div className={style.background4}>
            {!myprofile && <ProfilButton />}
          </div>
          {<ProfileSearch />}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
