import React from "react";
import { useState } from "react";

const ProfilButton = () => {
  const [friend, setFriend] = useState(false);
  const friended = () => {
    setFriend(!friend);
  };
  return (
    <button onClick={friended}>{friend === true ? "친구" : "친구하기"}</button>
  );
};

export default ProfilButton;
