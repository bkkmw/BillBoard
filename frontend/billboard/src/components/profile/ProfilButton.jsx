import axios from "axios";
import React from "react";
// import { Button, Modal } from "antd";
import { Button } from "@mui/material";
import style from "./ProfilButton.module.css";
import { useState, useEffect } from "react";
import httpClient from "../../utils/axios";
import { follow } from "../../store/profile";
import { followdelete } from "../../store/profile";
import { useDispatch } from "react-redux";
import { useRouteLoaderData } from "react-router";
import { useSelector } from "react-redux";
import { userProfile } from "../../store/profile";

const ProfilButton = () => {
  const dispatch = useDispatch();
  const [friend, setFriend] = useState(false);
  const { loginUser } = useSelector((state) => state.user);
  const toUserId = useRouteLoaderData("profile");
  const [friendData, setFriendData] = useState([]);

  useEffect(() => {
    dispatch(userProfile(toUserId)).then((res) => {
      setFriendData(res.payload.userInfo);
    });
  }, [toUserId]);

  // console.log(friendData.isFollowing);

  useEffect(() => {}, []);

  // 팔로우
  const friended = () => {
    const data = { fromUserId: loginUser.userId, toUserId: toUserId };
    dispatch(follow(data))
      .then((res) => {
        console.log(res);
        setFriendData({ ...friendData, isFollowing: 1 });
      })
      .catch((error) => {
        console.log(error);
      });
    setFriend(true);
  };

  // 언팔로우
  const frienddelete = () => {
    const data = { fromUserId: loginUser.userId, toUserId: toUserId };
    dispatch(followdelete(data))
      .then((res) => {
        console.log(res);
        setFriendData({ ...friendData, isFollowing: 0 });
      })
      .catch((error) => {
        console.log(error);
      });
    setFriend(false);
  };

  return (
    <div>
      <Button
        sx={{
          color: friendData.isFollowing === 1 ? "#E74646" : "black",
        }}
        onClick={friendData.isFollowing === 1 ? frienddelete : friended}
      >
        {friendData.isFollowing === 1 ? "언팔로우" : "팔로우"}
      </Button>
    </div>
  );
};

export default ProfilButton;
