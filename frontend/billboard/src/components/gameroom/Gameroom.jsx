// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Button, Col, Row } from "antd";
// import UserList from "./UserList";
// import GameResult from "./GameResult";
// import { useDispatch } from "react-redux";

// const Gameroom = () => {
//   const dispatch = useDispatch();
//   
//   const [userList, setUserList] = useState([]);
//   const [isInGame, setIsInGame] = useState(false);

//   const delUser = (id) => {
//     const newUserList = userList.filter((user) => {
//       return user.id !== id;
//     });
//     setUserList(newUserList);
//   };
//   return (
//     <div>
//       <Row>
//         <Col span={12}>
//           <UserList userList={userList} delUser={delUser}></UserList>
//         </Col>
//       </Row>

//       {isInGame === false ? (
//         <Button
//           onClick={() => {
//             setIsInGame(true);
//           }}
//         >
//           게임시작
//         </Button>
//       ) : (
//         <>
//           <Button
//             onClick={() => {
//               setOpenGameResult(true);
//             }}
//           >
//             게임 결과 입력
//           </Button>

//         </>
//       )}
//     </div>
//   );
// };

// export default Gameroom;

import React, { useEffect, useState } from "react";
import RoomLeft from "./RoomLeft";
import RoomRight from "./RoomRight";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectgameroom, setGameroomInit } from "../../store/gameroom";

const Gameroom = () => {
  const dispatch = useDispatch()
  const endGame = () => {
    dispatch(setGameroomInit())
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "85vw",
        height: "70vh",
        marginTop: "12vh",
        border: "2rem solid #d9d9d9",
        borderRadius: "3rem",
      }}
    >
      <RoomLeft />
      <RoomRight />

      <Button color="warning" onClick={() => {
        endGame()

      }}>게임종료</Button>
    </div>
  );
};

export default Gameroom;
