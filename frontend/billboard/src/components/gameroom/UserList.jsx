import { Button, Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import UserListDrawer from "./UserListDrawer";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user";
import { action } from "../../store/store";
import { getentries, selectgameroom, setPlayer } from "../../store/gameroom";
import RoomEntry from "./RoomEntry";
import Review from "./Review";

const { Meta } = Card;

const UserList = () => {
  const isInGame = useSelector(selectgameroom).isInGame;
  const gameHistory = useSelector(selectgameroom).gameHistory;
  const dispatch = useDispatch();
  const userList = useSelector(selectgameroom).players;
  const myinfo = useSelector(selectUser).loginUser;
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [roomEntries, SetRoomEntries] = useState([]);
  const [reviewId, setReviewId] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const delUser = (id) => {

    const newUserList = userList.filter((user) => {
      return user.userId !== id;
    });
    dispatch(setPlayer(newUserList));
  };
  const addUser = (userinfo) => {
    var index = userList.findIndex((user) => user.userId === userinfo.userId);
    if (index === -1) {
      console.log("리스트에 없는 유저");
      const newUserList = [...userList, userinfo];
      console.log(newUserList);
      dispatch(setPlayer(newUserList));
    } else {
      console.log("리스트에 있는 유저");
      console.log();
    }
  };
  useEffect(() => {
    addUser(myinfo);
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const getEntries = (userId) => {
    dispatch(getentries(userId)).then((res) => {
      console.log(res);
      if (res.payload.status === 200) {
        console.log("예약정보 불러오기 성공");
        console.log(res);
        SetRoomEntries(res.payload.data.rooms);
        showModal();
      } else if (res.payload.status === 204) {
        console.log("예약정보 없음");
      } else if (res.payload.response.status === 404) {
        console.log("존재하지 않는 유저");
      }
    });
  };
  const postReview = (userId) => {
    setReviewId(userId);
    setIsReviewOpen(true);
  };

  return (
    <div>
      <Row>
        <Col style={{ height: "auto", maxHeight: "50vh", overflowY: "scroll" }}>
          {userList.length !== 0 &&
            userList.map((user, i) => {
              return (
                <Col span={24} key={`${i}${user.userId}`}>
                  <Card style={{ width: 300 }}>
                    <p>id:{user.userId}</p>
                    <p>score:{user.winCount}</p>
                    {!isInGame && (
                      <>
                        <Button
                          type="primary"
                          onClick={() => getEntries(user.userId)}
                        >
                          예약정보 불러오기
                        </Button>
                        {gameHistory.length > 0 && (
                          <>
                            <Button
                              type="primary"
                              onClick={() => postReview(user.userId)}
                            >
                              리뷰남기기
                            </Button>
                          </>
                        )}
                        <CloseCircleOutlined
                          onClick={() => {
                            delUser(user.userId);
                          }}
                        />
                      </>
                    )}
                  </Card>
                </Col>
              );
            })}
        </Col>
        <Col span={24}>
          <Card
            style={{ width: 300 }}
            onClick={() => {
              showDrawer();
            }}
          >
            <p>add user</p>
          </Card>
        </Col>
      </Row>
      <UserListDrawer
        setOpen={setOpen}
        showDrawer={showDrawer}
        onClose={onClose}
        open={open}
        userList={userList}
        addUser={addUser}
      />
      <RoomEntry
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        rooms={roomEntries}
        addUser={addUser}
      />
      <Review
        isReviewOpen={isReviewOpen}
        setIsReviewOpen={setIsReviewOpen}
        userId={reviewId}
        gameHistory={gameHistory}
      />
    </div>
  );
};

export default UserList;
