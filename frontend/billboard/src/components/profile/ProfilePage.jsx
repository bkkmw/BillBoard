import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProfileFavorites from "./ProfileFavorites";
import ProfileInfo from "./ProfileInfo";
import ProfileRecord from "./ProfileRecord";
import { selectUser } from "../../store/user";
import { flexbox } from "@mui/system";

const Profile = () => {
  // const userId = useSelector(selectUser).loginUser.userId;
  return (
    <div
      style={{
        marginTop: "12vh",
        border: "2rem solid #d9d9d9",
        borderRadius: "3rem",
      }}
    >
      <ProfileInfo />
      <hr
        style={{ width: "80vw", marginTop: "1.5rem", marginBottom: "1rem" }}
      />
      <ProfileRecord />
      <hr
        style={{ width: "80vw", marginTop: "1.5rem", marginBottom: "1.5rem" }}
      />
      <ProfileFavorites />
    </div>
  );
};

export default Profile;
