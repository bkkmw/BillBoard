import React from "react";

import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";

import { useForm, Controller, useFormState } from "react-hook-form";

const UserEmail = () => {
  const formState = useFormState();
  return (
    <Grid item xs={12}>
      <Controller
        name="UserEmail"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField
            fullWidth
            label="이메일"
            name="UserEmail"
            id="UserEmail"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            error={Boolean(formState.errors.UserEmail)}
            helperText={formState.errors.UserEmail?.message}
          />
        )}
        rules={{
          required: "이메일을 입력해주세요",
          pattern: {
            value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            message: "올바르지 않은 이메일 형식입니다",
          },
        }}
      />
    </Grid>
  );
};

export default UserEmail;
