import { React, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

export default function GameSearch() {
  const checkboxes = [
    { label: "커스텀 게임", checked: false },
    { label: "가족 게임", checked: false },
    { label: "파티 게임", checked: false },
    { label: "추상 게임", checked: false },
    { label: "어린이 게임", checked: false },
    { label: "전쟁 게임", checked: false },
    { label: "전략 게임", checked: false },
    { label: "영화적 게임", checked: false },
  ];

  return (
    <Box component="form">
      <Box
        sx={{
          width: "70vw",
          maxWidth: "100%",
        }}
      >
        <TextField fullWidth label="게임 이름을 입력하시오" id="gamesearch" />
      </Box>
      <Grid container spacing={3}>
        {checkboxes.map((checkbox, index) => (
          <Grid item xs={3} key={index}>
            <FormControlLabel
              control={<Checkbox defaultChecked={checkbox.checked} />}
              label={checkbox.label}
            />
          </Grid>
        ))}
      </Grid>
      <Button type="submit" fullWidth variant="outlined">
        제출
      </Button>
      <hr />
    </Box>
  );
}
