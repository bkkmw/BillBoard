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
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Skeleton, Switch } from 'antd';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const { Meta } = Card;

const UserList = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
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
  const [menuId, setMenuId] = useState()
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  // 이벤트출력
  const handleClick = (event) => {
    setMenuId(event.currentTarget.id)
    setAnchorEl(event.currentTarget);
  };
  const addUser = (userinfo) => {
    var index = userList.findIndex((user) => user.userId === userinfo.userId);
    if (index === -1) {
      // console.log("리스트에 없는 유저");
      const newUserList = [...userList, {...userinfo, score:0}];
      // console.log(newUserList);
      dispatch(setPlayer(newUserList));
    } else {
      // console.log("리스트에 있는 유저");
      // console.log();
    }
  };
  const addEntry = (entries) => {
    let newUserList = [...userList];
    for (const entry of entries) {
      var index = userList.findIndex((user) => user.userId === entry.user.userId);
      if (index === -1) {
        const userInfo = {
          email: entry.user.email,
          experience: entry.user.experience,
          matchCount: entry.user.matchCount,
          nickname: entry.user.nickname,
          userId: entry.user.userId,
          winCount: entry.user.winCount,
          score:0
        };
        newUserList = [...newUserList, userInfo]
      }
    }
    dispatch(setPlayer(newUserList));
  }
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
      // console.log(res);
      if (res.payload.status === 200) {
        console.log("예약정보 불러오기 성공");
        // console.log(res);
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
        <h1>플레이어</h1>
      </Row>
      <Row>
        
        <Col style={{ height: "auto", maxHeight: "50vh", overflowY: "scroll" }}>
          {userList.length !== 0 &&
            userList.map((user, i) => {
              return (
                <Col span={24} key={`${i}${user.userId}`}>
                  <Card
                    style={{
                      width: 300,

                    }}
                  >

                    <Meta
                      avatar={<Tooltip title="Account settings" ><IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={openMenu ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        id={user.userId}
                      >
                        <Avatar src={`https://avatars.dicebear.com/api/identicon/${user.userId}.svg`} />
                      </IconButton></Tooltip>}
                      title={user.userId}
                      description={`score:${user.score}`}
                    />

                  </Card>
                  {/* <Card style={{ width: 300 }}>
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
                  </Card> */}
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
            <p>플레이어를 추가하세요</p>
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
        addEntry={addEntry}
      />
      <Review
        isReviewOpen={isReviewOpen}
        setIsReviewOpen={setIsReviewOpen}
        userId={reviewId}
        gameHistory={gameHistory}
      />


      {!isInGame && (<Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { getEntries(menuId) }}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          예약목록 불러오기
        </MenuItem>

        {gameHistory.length > 0 && (
          <MenuItem onClick={() => postReview(menuId)}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            리뷰남기기
          </MenuItem>
        )}

        <MenuItem onClick={() => { delUser(menuId) }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          유저 삭제
        </MenuItem>
      </Menu>)}
    </div>
  );
};

export default UserList;
