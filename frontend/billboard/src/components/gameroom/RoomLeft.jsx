import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "antd";
import UserList from "./UserList";
import GameResult from "./GameResult";
import { useDispatch } from "react-redux";

const RoomLeft = () => {
  const dispatch = useDispatch();
  const [openGameResult, setOpenGameResult] = useState(false);

  const [isInGame, setIsInGame] = useState(false);


  return (
    <div style={{ width: "50vw" }}>
      <Row>
        <Col span={12}>
          <UserList></UserList>
        </Col>
      </Row>
    </div>
  );
};

export default RoomLeft;
