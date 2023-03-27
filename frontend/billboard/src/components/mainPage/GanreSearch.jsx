import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

export default function GanreSearch() {
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
    <FormGroup style={{ textAlign: "start" }}>
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
    </FormGroup>
  );
}
