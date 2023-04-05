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

const GameRecommend = ({ setpropGameId, showModal }) => {
  const players = useSelector(selectgameroom).players;
  const selectgameInfo = useSelector(selectgameroom).gameInfo;
  const dispatch = useDispatch();
  const [gameData, setGameData] = useState();
  const [boardReview, setBoardReview] = useState([]);

  useEffect(() => {
    // console.log(selectgameInfo);
  }, [selectgameInfo]);
  useEffect(() => {
    const data = players.map((player) => player.userId);
    // console.log(data)
    dispatch(getCombiRecom({ userList: data })).then((res) => {
      setBoardReview(res.payload.data.games);
    });
  }, [players]);
  return (
    <div>
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
    </div>
  );
};

export default GameRecommend;
