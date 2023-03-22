import React, {useState} from "react";

import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import TextField from "@mui/material/TextField";

import { useForm, Controller, useFormState } from "react-hook-form";

const UserPassword = () => {

  // 비밀번호 보이게 안보이게
  const [showPswd, setShowPswd] = useState(false)
  const handlePswd = () => {
    // console.log(showPswd);
    setShowPswd(!showPswd);
  }
  // 유효성 검사
  const formState = useFormState();
  return (
    <>
      <Grid item xs={12}>
        <Controller
          name="UserPassword"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              label="비밀번호"
              type={showPswd? 'text' : 'password'}
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
        <Checkbox onClick={handlePswd}/>
      </Grid>
      
    </>
  );
};

export default UserPassword;
