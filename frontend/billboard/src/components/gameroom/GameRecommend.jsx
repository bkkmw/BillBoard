import { getCombiRecom } from "../../store/gameroom";
import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBoardGames } from "../../store/boardgames";
import { selectgameroom, setGame } from "../../store/gameroom";
import Noting from "../lottie/Noting";
import Animation4 from "../lottie/Animation4";
import Loading from "../lottie/Loading";
import { Row } from "antd";

const GameRecommend = ({ setpropGameId, showModal, setIsInRecommend, isInRecommend }) => {
  const players = useSelector(selectgameroom).players;
  const selectgameInfo = useSelector(selectgameroom).gameInfo;
  const dispatch = useDispatch();
  const [gameData, setGameData] = useState();
  const [boardReview, setBoardReview] = useState([]);
  const [isNothing, setIsNothing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // console.log(selectgameInfo);
  }, [selectgameInfo]);
  useEffect(() => {
    const data = players.map((player) => player.userId);
    // console.log(data)
    dispatch(getCombiRecom({ userList: data })).then((res) => {
      // setIsLoading(false)
      if (res.payload.status === 200) {
        setBoardReview(res.payload.data.games)
      }
      else if (res.payload.response.status === 500) {
        console.log('500에러')
        setIsNothing(true)
      }
      else { setBoardReview(res.payload.data.games); }

    });
  }, [players]);
  return (
    <div>{isLoading?
    <>
  
    {players.length}인의 취향을 종합해 결과를 받아오는중입니다
    <Loading/></>:<>
      
      <Button
        type="primary"
        style={{
          fontSize: "1.5rem",
          width: "8vw",
          height: "6vh",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={() => { setIsInRecommend(!isInRecommend) }}>
        {isInRecommend ? '검색하기' : '추천받기'}
      </Button>{isNothing ? <>
        <>추천할 내용이 없습니다</>
        <Noting />

      </> :
        <Grid style={{ width: "42vw", height: "50vh", overflowY: "scroll" }}>
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
                      setpropGameId(game.gameId);
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
                        fontSize:"1vw"
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
          </div>
        </Grid>
      }
    </>}</div>
  );
};

export default GameRecommend;
