import React from "react";
import { Link } from "react-router-dom";
import { selectUser } from "../../store/user";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
  const userId = useSelector(selectUser).loginUser.userId;
  return (
    <div>
      <ProfileInfo />
      <Link to="/">메인페이지로</Link>
    </div>
  );
};

export default Profile;
