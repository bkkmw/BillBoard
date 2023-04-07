import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectgameroom } from '../../store/gameroom';

import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const GameSelectInfo = () => {
  const gameInfo = useSelector(selectgameroom).gameInfo
  const isInGame = useSelector(selectgameroom).isInGame
  useEffect(()=>{
    console.log(gameInfo)
  },[gameInfo])
  return (
    <div style={{marginLeft:"3vw", width:"18vw"}}>
      {gameInfo.image&&<>
      <h1> {isInGame?'현재 플레이중인 게임':'다음 플레이할 게임'} </h1>
        <Card sx={{ width: "18vw", borderRadius:"2rem" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="500"
              image={gameInfo.image}
              style={{ objectFit: "fill" }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ height: "3vh", overflowY: "scroll" }}
              >
                {gameInfo.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card></>}
      
    </div>
  );
};

export default GameSelectInfo;