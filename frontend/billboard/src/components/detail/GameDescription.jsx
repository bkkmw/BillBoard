import React, { useState } from "react";
import style from "./GameDescription.module.css";
import { Box } from "@mui/material";
import { textAlign } from "@mui/system";
const GameDescription = (props) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const maxLength = 200;

  const description =
    expanded || props.details.description.length <= maxLength
      ? props.details.description
      : props.details.description.substring(0, maxLength) + "...";
  return (
    <div className={style.background2}>
      <span style={{ textAlign: "left" }} className={style.font}>
        배경
      </span>
      <Box
        style={{
          width: "74vw",
          marginTop: "3vh",
          textAlign: "start",
          wordBreak: "keep-all",
          cursor: "pointer",
        }}
        className={style.font2}
        onClick={toggleExpanded}
      >
        {description}
      </Box>
    </div>
  );
};

export default GameDescription;
