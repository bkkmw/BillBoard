import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { TextField, Button } from "@mui/material";
// import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";

import httpClient from "../../utils/axios";

const UserSearch = () => {
  // 친구리스트
  const [userList, setUserList] = useState([]);
  const [keyword, setKeyword] = useState("");
  // 친구찾기 api
  useEffect(() => {
    const userSearch = async () => {
      try {
        const response = await httpClient.get(`users/search/${keyword}`);
        // console.log(response.data);
        setUserList(response.data.userList);
        // console.log(userList);
      } catch (e) {
        // if (e.response.status !== 400 && e.response.status !== 204) {
        console.log(e);
        // }
      }
    };
    if (keyword !== "") {
      userSearch();
    }
  }, [keyword]);

  const handleSearch = (event) => {
    const keyword = event.target.value;
    setKeyword(keyword);
  };
  return (
    <>
      <TextField
        id="searchbar"
        onChange={handleSearch}
        label="친구이름"
        variant="standard"
      />

      {userList &&
        userList.map((userLists, index) => {
          // console.log(userLists);
          return (
            <div key={index}>
              <Button variant="outlined" sx={{}}>
                <span>{index + 1}.</span>
                <Link to={`/profile/${userLists.userId}`}>
                  {userLists.userId}
                </Link>
              </Button>
            </div>
          );
        })}
    </>
  );
};
export default UserSearch;
