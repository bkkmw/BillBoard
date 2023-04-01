import React from "react";

import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ProfileLatestList = (props) => {
  const recentGames = props.user.recentGames;
  const userInfo = props.user.userInfo;
  // console.log(recentGames);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-evenly",
      }}
    >
      <span
        style={{
          fontSize: "3rem",
          fontWeight: "bolder",
          marginBottom: "1.5rem",
          textAlign: "start",
        }}
      >
        최근 플레이한 게임
      </span>
      <div
        style={{
          width: "57vw",
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-around",
          gap: "30px",
        }}
      >
        {recentGames.map((recentgame, index) => {
          return (
            <Card key={index} sx={{ width: "18vw" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="320"
                  image={recentgame.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recentgame.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileLatestList;
