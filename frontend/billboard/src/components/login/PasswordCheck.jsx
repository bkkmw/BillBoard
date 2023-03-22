import React from "react";

import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";

import { useForm, Controller, useFormState } from "react-hook-form";

const PasswordCheck = () => {
  const formState = useFormState();
  const form = useForm();

  return (
    <>
      <Grid item xs={6}>
        <Controller
          name="PasswordCheck"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              label="비밀번호"
              type="password"
              fullWidth
              name="PasswordCheck"
              id="PasswordCheck"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              error={Boolean(formState.errors.PasswordCheck)}
              helperText={formState.errors.PasswordCheck?.message}
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

export default PasswordCheck;
