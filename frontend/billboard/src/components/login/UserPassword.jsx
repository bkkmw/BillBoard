import React from "react";

import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";

import { useForm, Controller, useFormState } from "react-hook-form";

const UserPassword = () => {
  const formState = useFormState();
  return (
    <>
      <Grid item xs={6}>
        <Controller
          name="UserPassword"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              label="비밀번호"
              type="password"
              fullWidth
              name="UserPassword"
              id="UserPassword"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              error={Boolean(formState.errors.UserPassword)}
              helperText={formState.errors.UserPassword?.message}
            />
          )}
          rules={{
            required: "비밀번호를 입력해주세요",
            pattern: {
              value: /^.{8,}$/,
              message: "8자 이상이어야 합니다.",
            },
          }}
        />
      </Grid>
    </>
  );
};

export default UserPassword;
