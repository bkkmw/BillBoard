import axios from "axios";
import React from "react";
import { useState } from "react";
import httpClient from "../../utils/axios";
import { follow } from "../../store/profile";
import { useDispatch } from "react-redux";

const ProfilButton = () => {
  // axios({
  //   method: "POST",
  //   url: `{baseURL}/follow`,
  //   data: { fromUserId: "ky014789", toUserId: "string" },
  // })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const [friend, setFriend] = useState(false);
  const friended = () => {
    setFriend(!friend);
  };
  return (
    <button onClick={friended}>{friend === true ? "친구" : "친구하기"}</button>
  );
};

export default ProfilButton;
