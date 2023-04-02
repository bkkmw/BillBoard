import React from "react";

import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./ProfileLatestList2.css";

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
          marginTop: "0.5rem",
          textAlign: "start",
        }}
      >
        최근 플레이한 게임
      </span>
      <div
        style={{
          width: "57vw",
          height: "45vh",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          // justifyContent: "space-around",
          // gap: "30px",
          // marginTop: "10vh",
          overflowY: "scroll",
        }}
      >
        {recentGames.map((recentgame, index) => {
          return (
            <div className="flip" key={index}>
              <div className="card">
                <div className="front">
                  <Card sx={{ width: "18vw" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="320"
                        image={recentgame.image}
                        style={{ objectFit: "fill" }}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ height: "3vh", overflowY: "scroll" }}
                        >
                          {recentgame.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
                <div className="back">
                  <Card sx={{ width: "18vw" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="320"
                        image={recentgame.image}
                        style={{ objectFit: "fill" }}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ height: "3vh", overflowY: "scroll" }}
                        >
                          {recentgame.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              </div>
            </div>
          );
        })}

        {/* {recentGames.map((recentgame, index) => {
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
        })} */}
      </div>
    </div>
  );
};

export default ProfileLatestList;
