import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";

import TextField from "@mui/material/TextField";

import { useForm, Controller, useFormState, useWatch } from "react-hook-form";

const PasswordCheck = () => {
  const formState = useFormState();
  const form = useForm();
  const watch = useWatch();
  // 비밀번호 보이게 안보이게
  const [showPswd, setShowPswd] = useState(false);
  const handlePswd = () => {
    // console.log(showPswd);
    setShowPswd(!showPswd);
  };

  return (
    <>
      <Grid item xs={12}>
        <Controller
          name="PasswordCheck"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              label="비밀번호 확인"
              // type="password"
              type={showPswd ? "text" : "password"}
              fullWidth
              name="PasswordCheck"
              id="PasswordCheck"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              error={Boolean(formState.errors.PasswordCheck)}
              helperText={formState.errors.PasswordCheck?.message}
              InputProps={{
                endAdornment: (
                  <Checkbox onClick={handlePswd} checked={showPswd} />
                ),
              }}
            />
          )}
          rules={{
            required: "비밀번호를 입력해주세요",
            pattern: {
              value: /^.{8,}$/,
              message: "8자 이상이어야 합니다.",
            },
            validate: {
              check: (val) => {
                if (val !== watch.UserPassword) {
                  return "비밀번호가 불일치합니다.";
                }
              },
            },
          }}
        />
      </Grid>
    </>
  );
};

export default PasswordCheck;
