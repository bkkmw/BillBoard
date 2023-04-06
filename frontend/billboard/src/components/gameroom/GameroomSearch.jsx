import React, { useEffect, useState } from "react";
// import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, TextField } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoardGames } from "../../store/boardgames";
import { selectgameroom, setGame } from "../../store/gameroom";
import Searching from "../lottie/Searching";
import { Divider, Space, notification } from 'antd';
import { Collapse, theme } from 'antd';
import { Checkbox, Col, Form, Rate, Row, Slider, Drawer, Button } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const checkboxes = [
  ["strategy", "전략 게임"],
  ["family", "가족 게임"],
  ["party", "파티 게임"],
  ["abstract", "추상 게임"],
  ["thematic", "영화적 게임"],
  ["war", "전쟁 게임"],
  ["customizable", "커스텀 게임"],
  ["children", "어린이 게임"],
];
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const GameroomSearch = ({
  setGameDetail,
  showModal,
  setIsInRecommend,
  isInRecommend,
}) => {
  const submitRef = useRef()
  const selectgameInfo = useSelector(selectgameroom).gameInfo;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  const [gameData, setGameData] = useState({
    name: "",
    maxplaytime: 1000,
    maxplayers: 0,
    average: 5,
    averageWeight: 0,
    strategy: "",
    family: "",
    party: "",
    abstract: "",
    thematic: "",
    war: "",
    customizable: "",
    children: "",
  });
  const [boardReview, setBoardReview] = useState([]);
  const openNotification = (placement) => {
    api['success']({
      message: `검색 결과를 불러오는데 성공했습니다`,
      placement,
    });
  };
  const [api, contextHolder] = notification.useNotification();
  const boards = (data) => {

    dispatch(getBoardGames(data)).then((response) => {
      // console.log(response);
      setBoardReview(response.payload["review"]);
      openNotification('right')
    });
  };
  useEffect(() => {
    console.log(gameData)
  }, [gameData])
  useEffect(() => {

  }, [boardReview])
  useEffect(() => {
    // boards("");
    // console.log(selectgameInfo);
  }, [selectgameInfo]);
  const onFinish = (values) => {
    console.log(values)
    let newData = { ...gameData };
    for (const [value, v] of Object.entries(values)) {
      if (value === "Genre" && v !== undefined) {
        for (const genre of v) {
          newData[genre] = "true";
        }
        continue;
      } else if (v) {
        newData[value] = v;
      }
    }
    newData = { ...newData, name: inputRef.current.value };
    boards(newData);

  };
  return (
    <>
      {contextHolder}
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <div
          style={{
            width: "auto",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-evenly",
          }}
        >  <Button
          type="primary"
          style={{
            fontSize: "1.5rem",
            width: "8vw",
            height: "6vh",
            display: "flex",
            justifyContent: "center",
            marginRight: "1vw"
          }}
          onClick={() => { setIsInRecommend(!isInRecommend) }}>
            {isInRecommend ? '검색하기' : '추천받기'}
          </Button>
          <TextField
            fullWidth
            label="게임 이름을 입력하시오"
            id="gamesearch"
            inputRef={inputRef}
            style={{
              width: "23vw",
              marginRight: "1vw"
            }}
          />
          <Form.Item>
            <Button
              type="primary"
              style={{
                fontSize: "1.5rem",
                width: "8vw",
                height: "6vh",
                display: "flex",
                justifyContent: "center",
                marginRight: "1vw"
              }}
              htmlType="submit"
            >
              검색
            </Button>
          </Form.Item>
        </div>
        <Collapse
          bordered={false}

          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          style={{
            background: token.colorBgContainer,
            textAlign: "start"
          }}
        ><Panel header="상세검색" key="1" style={panelStyle}>
            {/* <GameSearch gameData={gameData} setGameData={setGameData} search={boards} ref={submitRef} nameData={inputRef.current.value} /> */}

            <Form.Item name="maxplaytime" label="플레이시간">
              <Slider
                max={150}
                marks={{
                  0: "0",
                  30: "30",
                  60: "60",
                  90: "90",
                  120: "120",
                  150: "150",
                }}
              />
            </Form.Item>
            <Form.Item name="maxplayers" label="인원수">
              <Slider
                max={15}
                marks={{
                  0: "1",
                  2: "2",
                  4: "4",
                  6: "6",
                  10: "10",
                  15: "15",
                }}
              />
            </Form.Item>
            <Form.Item name="averageWeight" label="최대 난이도">
              <Slider
                max={5}
                marks={{
                  0: "0",
                  1: "1",
                  2: "2",
                  3: "3",
                  4: "4",
                  5: "5",
                }}
              />
            </Form.Item>
            <Form.Item name="average" label="평점">
              <Rate count={10} />
            </Form.Item>

            <Form.Item name="Genre" label="genre">
              <Checkbox.Group>
                <Row>
                  {checkboxes.map((genre, i) => {
                    return (
                      <Col span={12} key={genre + i}>
                        <Checkbox
                          value={genre[0]}
                          style={{
                            lineHeight: "32px",
                          }}
                        >
                          {genre[1]}
                        </Checkbox>
                      </Col>
                    );
                  })}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
            </Form.Item>

          </Panel>
        </Collapse>
      </Form>
      <Grid style={{ width: "42vw", height: "50vh", overflowY: "scroll" }}>
        {boardReview.length != 0 ?
          <div
            style={{
              width: "42vw",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              paddingLeft: "1.3rem",
            }}
          >
            {boardReview.map((game, i) => (
              <Card sx={{ width: "12vw" }} key={game + i}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="160"
                    image={`${game.image}`}
                    alt="green iguana"
                    onClick={() => {
                      setGameDetail(game);
                      showModal();
                    }}
                    style={{ objectFit: "fill" }}
                  />
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      padding: "0",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "0",
                        width: "7vw",
                        height: "7vh",
                        overflowY: "scroll",
                      }}
                    >
                      {game.name}
                    </Typography>
                    {selectgameInfo.gameId === game.gameId ? (
                      <Button
                        color="success"
                        onClick={() => {
                          dispatch(setGame({ gameId: "" }));
                        }}
                        style={{
                          width: "4vw",
                          height: "4vh",
                          marginTop: "1.5vh",
                        }}
                      >
                        해제
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          dispatch(setGame(game));
                        }}
                        style={{
                          width: "4vw",
                          height: "4vh",
                          marginTop: "1.5vh",
                        }}
                      >
                        선택
                      </Button>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div> : <div>

            <Searching />찾고싶은 게임명을 입력하세요</div>}
      </Grid>



    </>
  );
};

export default GameroomSearch;
