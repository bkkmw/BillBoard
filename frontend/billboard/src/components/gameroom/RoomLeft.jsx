import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "antd";
import UserList from "./UserList";
import GameResult from "./GameResult";
import { useDispatch } from "react-redux";

const RoomLeft = () => {
  const dispatch = useDispatch();
  const [openGameResult, setOpenGameResult] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isInGame, setIsInGame] = useState(false);

  const delUser = (id) => {
    const newUserList = userList.filter((user) => {
      return user.id !== id;
    });
    setUserList(newUserList);
  };
  return (
    <div style={{ width: "50vw" }}>
      <Row>
        <Col span={12}>
          <UserList userList={userList} delUser={delUser}></UserList>
        </Col>
      </Row>
    </div>
  );
};

export default RoomLeft;
