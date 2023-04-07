import { React, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useRouteLoaderData } from "react-router-dom";

import GameStart from "../GameStart";

import ProfileFavorites from "./ProfileFavorites";
import ProfileInfo from "./ProfileInfo";
import ProfileRecord from "./ProfileRecord";
import { selectUser } from "../../store/user";
import style from "./ProfilePage.module.css";

import { userProfile } from "../../store/profile";

const Profile = () => {
  const [user, SetUser] = useState(null);
  const userId = useRouteLoaderData("profile");
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state.user);

  // 유저 프로필 조회
  useEffect(() => {
    const getUser = () => {
      dispatch(userProfile(userId)).then((res) => {
        if (res.payload.userInfo) {
          SetUser(res.payload);
        }
      });
    };
    getUser();
  }, [userId]);
  return (
    <div
      style={{
        marginTop: "12vh",
        width: "80vw",
        border: "2rem solid #d9d9d9",
        borderRadius: "3rem",
      }}
    >
      <GameStart />
      {user && (
        <>
          <ProfileInfo user={user} />
          <hr
            style={{ width: "80vw", marginTop: "1.5rem", marginBottom: "1rem" }}
          />
          <ProfileRecord user={user} />
          <hr
            style={{ width: "80vw", marginTop: "1.5rem", marginBottom: "1rem" }}
          />
          <ProfileFavorites user={user} />
        </>
      )}
    </div>
  );
};

export default Profile;
