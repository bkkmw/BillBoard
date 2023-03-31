import React from "react";

import { useSelector } from "react-redux";
import { Link, useRouteLoaderData } from "react-router-dom";

import ProfileFavorites from "./ProfileFavorites";
import ProfileInfo from "./ProfileInfo";
import ProfileRecord from "./ProfileRecord";
import { selectUser } from "../../store/user";
import style from "./ProfilePage.module.css";

const Profile = () => {
  const userId = useRouteLoaderData("profile");
  // const userId = useSelector(selectUser).loginUser.userId;
  return (
    <div className={style.background}>
      <ProfileInfo />
      <ProfileRecord />
      <ProfileFavorites />
    </div>
  );
};

export default Profile;
