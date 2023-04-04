import { React, useState } from "react";

import { Grid, Button } from "@mui/material";

import TextField from "@mui/material/TextField";

import httpClient from "../../utils/axios";

const EmailCertificate = (props) => {
  const [authkey, setAuthKey] = useState("");
  //이메일 인증번호 api
  const email = props.email;
  const emailCertificate = async () => {
    // console.log("하하", email, authkey);
    try {
      const response = await httpClient.post("users/check-authkey", {
        email: email,
        authKey: authkey,
      });
      // console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleKey = (event) => {
    // console.log(event.target.value);
    setAuthKey(event.target.value);
    // console.log(authkey);
  };

  return (
    <Grid>
      <Grid component="form" onSubmit={emailCertificate} item xs={8}>
        <TextField
          onChange={handleKey}
          fullWidth
          label="이메일 인증번호"
          name="EmailCertificate"
          id="EmailCertificate"
        />
      </Grid>
      <Grid item xs={4}>
        <Button type="submit" variant="contained">
          인증 확인
        </Button>
      </Grid>
    </Grid>
  );
};

export default EmailCertificate;
