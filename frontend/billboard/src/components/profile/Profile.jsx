import React from "react";
import { Link } from "react-router-dom";
import { selectUser } from "../../store/user";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import ProfileFavorites from "./ProfileFavorites";
import ProfileRecord from "./ProfileRecord";

const Profile = () => {
  const userId = useSelector(selectUser).loginUser.userId;
  return (
    <div>
      <ProfileInfo />
      <ProfileRecord />
      <ProfileFavorites />
      <Link to="/">메인페이지로</Link>
    </div>
  );
};

export default Profile;
