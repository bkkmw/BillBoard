import * as React from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const RoomRight = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "50vw",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          type="primary"
          style={{
            fontSize: "1.5rem",
            width: "8vw",
            height: "6vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          추천 받기
        </Button>
        <Input
          placeholder="게임 이름을 입력하시오"
          style={{ width: "25rem", fontSize: "1.5rem" }}
        ></Input>
        <Button style={{ fontSize: "1.5rem", marginRight: "1.2rem" }}>
          Submit
        </Button>
      </div>
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
          <Card sx={{ width: "12vw" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image="https://cataas.com/cat"
                alt="green iguana"
              />
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{
                    display: "flex",

                    alignItems: "center",

                    marginBottom: "0",
                  }}
                >
                  Lizard
                </Typography>
                <Checkbox />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Grid>
      <Button
        style={{
          fontSize: "1.5rem",
          width: "8vw",
          height: "6vh",
          marginLeft: "17vw",
        }}
      >
        게임 시작
      </Button>
    </div>
  );
};

export default RoomRight;
