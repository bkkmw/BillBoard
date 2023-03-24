import React from "react";

import { useFormContext, Controller, useFormState } from "react-hook-form";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const UserNickname = () => {
  const formContext = useFormContext();
  const formState = useFormState();

  return (
    <Grid item xs={12}>
      <Controller
        name="UserNickname"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField
            label="닉네임"
            fullWidth
            name="UserNickname"
            id="UserNickname"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            error={Boolean(formState.errors.UserNickname)}
            helperText={formState.errors.UserNickname?.message}
          />
        )}
        rules={{
          required: "닉네임을 입력해주세요",
          minLength: {
            value: 2,
            message: "2글자 이상 입력해주세요.",
          },
        }}
      />
    </Grid>
  );
};

export default UserNickname;
