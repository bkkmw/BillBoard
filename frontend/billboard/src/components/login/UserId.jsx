import React from "react";

import { useFormContext, Controller, useFormState } from "react-hook-form";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const UserId = () => {
  const formContext = useFormContext();
  const formState = useFormState();

  return (
    <Grid item xs={12}>
      <Controller
        name="UserId"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField
            label="아이디"
            fullWidth
            name="UserId"
            id="UserId"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            error={Boolean(formState.errors.UserId)}
            helperText={formState.errors.UserId?.message}
          />
        )}
        rules={{
          required: "아이디를 입력해주세요",
          minLength: {
            value: 2,
            message: "2글자 이상 입력해주세요.",
          },
        }}
      />
    </Grid>
  );
};

export default UserId;
