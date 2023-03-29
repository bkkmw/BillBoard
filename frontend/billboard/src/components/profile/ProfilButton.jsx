import axios from "axios";
import React from "react";
import { Button } from "antd";
import style from "./ProfilButton.module.css";
import { useState } from "react";
import httpClient from "../../utils/axios";
import { follow } from "../../store/profile";
import { followdelete } from "../../store/profile";
import { useDispatch } from "react-redux";

const ProfilButton = () => {
  const dispatch = useDispatch();

  const [friend, setFriend] = useState(false);
  const friended = () => {
    // setFriend(!friend);
    dispatch(follow({ fromUserId: "abc", toUserId: "def" }))
      .then((res) => {
        console.log(res.data);
        console.log("됨");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const frienddelete = () => {
    dispatch(followdelete({ fromUserId: "abc", toUserId: "def" }))
      .then((res) => {
        console.log(res.data);
        console.log("삭제됨");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button onClick={friended} type="primary" className={style.btn}>
        {friend === true ? "친구" : "친구하기"}
      </Button>
      <Button onClick={frienddelete}> 친구 삭제</Button>
    </div>
  );
};

export default ProfilButton;
