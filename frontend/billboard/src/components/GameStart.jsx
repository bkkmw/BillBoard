import React from "react";
import { Link } from "react-router-dom";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import { Button } from "@mui/material";
const GameStart = () => {
  return (
    <>
      <Link to={"/gameroom"}>
        <SportsEsportsOutlinedIcon
          style={{
            position: "fixed",
            bottom: "3rem",
            right: "3rem",
          }}
          sx={{
            color: "black",
            fontSize: "100px",
          }}
        />
      </Link>
    </>
  );
};

export default GameStart;
