import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProfileFavorites from "./ProfileFavorites";
import ProfileInfo from "./ProfileInfo";
import ProfileRecord from "./ProfileRecord";
import { selectUser } from "../../store/user";

import style from "./ProfilePage.module.css";

const Profile = () => {
  const userId = useSelector(selectUser).loginUser.userId;
  return (
    <div className={style.background}>
      <ProfileInfo />
      <ProfileRecord />
      <ProfileFavorites />
      <Link to="/">메인페이지로</Link>
    </div>
  );
};

export default Profile;
