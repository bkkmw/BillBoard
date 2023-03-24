import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from 'antd';
import UserList from "./UserList";
import GameResult from "./GameResult";



const Gameroom = () => {
  const [isInGame, setIsInGame] = useState(false)
  const [userList, setUserList] = useState([{id:'user1', score:0},{id:'user2',score:0},{id:'user3',score:0}])
  const [openGameResult, setOpenGameResult] = useState(false)

  
  const delUser = (id) =>{
    const newUserList = userList.filter((user) => {
      return user.id !== id
    })
    setUserList(newUserList)
  }
  return (
    <div>
      <Row>
        <Col span={12}>
        <UserList userList={userList} delUser={delUser}></UserList>
        </Col>
      </Row>
      
      
      {isInGame===false?<Button onClick={()=>{setIsInGame(true)}}>게임시작</Button>:<><Button onClick={()=>{setOpenGameResult(true)}}>게임 결과 입력</Button><GameResult isModalOpen={openGameResult} setIsModalOpen={setOpenGameResult} userList={userList} setUserList={setUserList} setIsInGame={setIsInGame}/></>
      }
    </div>
  );
};

export default Gameroom;
