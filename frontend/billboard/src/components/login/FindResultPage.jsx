import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import { Link } from "react-router-dom";
const FindResult = () => {
  const { state } = useLocation();
  // console.log(state);
  return (
    <Box>
      <Box>
        <h1>{`${state.email}`}에서 확인하세요</h1>
      </Box>
      <footer>
        <Link to={"/login"}>login</Link>
      </footer>
    </Box>
  );
};

export default FindResult;
