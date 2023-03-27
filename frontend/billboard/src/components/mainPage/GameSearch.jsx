import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function GameSearch() {
  return (
    <Box
      sx={{
        width: "70vw",
        maxWidth: "100%",
      }}
    >
      <TextField fullWidth label="게임 이름을 입력하시오" id="gamesearch" />
    </Box>
  );
}
