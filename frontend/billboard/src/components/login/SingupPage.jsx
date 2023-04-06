import { React, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import httpClient from "../../utils/axios";

import UserId from "./UserId";
import UserPassword from "./UserPassword";
import UserNickname from "./UserNickname";
import UserEmail from "./UserEmail";
import PasswordCheck from "./PasswordCheck";
import EmailCertificate from "./EmailCertificate";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";

import { useForm, FormProvider, useWatch } from "react-hook-form";

import { useSelector } from "react-redux";

const Singup = () => {
  const navigate = useNavigate();
  const [emailSended, setEmailSended] = useState(false);
  const [authKey, setAuthKey] = useState("");
  //회원가입 유효성 검사

  const form = useForm({
    defaultValues: {
      UserId: "",
      UserPassword: "",
      UserNickname: "",
      UserEmail: "",
      PasswordCheck: "",
    },
    mode: "onChange",
  });
  // 회원가입 api
  const onSubmit = (event) => {
    event.preventDefault;
    const userData = {
      userId: form.watch("UserId"),
      password: form.watch("UserPassword"),
      nickname: form.watch("UserNickname"),
      email: form.watch("UserEmail"),
    };
    handleSignUp(userData)
      .then(() => {
        alert("회원가입에 성공하였습니다.");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  async function handleSignUp(userdata) {
    // const response = await httpClient.post("/api/user", userdata);
    // return response.data;
    return (await httpClient.post("/users", userdata)).data;
  }

  // 아이디 중복체크 api
  const IdCheck = async () => {
    const userId = form.watch("UserId");
    try {
      const response = await httpClient(`users/check-id/${userId}`);
      console.log(response.status);
      if (response.status === 200) {
        alert("사용 가능한 아이디");
      }
    } catch (e) {
      alert("사용 불가한 아이디");
    }
  };

  // 이메일 인증
  const certificateEmail = async () => {
    // alert("이메일로 인증번호를 발송했습니다.");
    const email = form.watch("UserEmail");
    // console.log("안녕", email);ㄴ
    try {
      const response = await httpClient.post("users/email-auth", {
        email: email,
      });
      // console.log(response);
      if (response.data.status === 200) {
        alert("이메일을 확인해 주세요");
      }
    } catch (e) {
      // console.log(e.response.status);
      if (e.response.status === 409) {
        alert("사용중인 이메일 입니다.");
      }
    }
    setEmailSended(true);
  };
  // 이메일 인증번호 확인

  const handleAuthKeyChange = (event) => {
    setAuthKey(event.target.value);
  };

  const EmailAuth = async () => {
    // e.preventDefault();
    const email = form.watch("UserEmail");
    // console.log("끼에에ㅔㅇ", email, authKey);
    try {
      const response = await httpClient.post("users/check-authkey", {
        email: email,
        authKey: authKey,
      });
      // console.log(response.data);
      if (response.data.status === 200) {
        alert("이메일 인증 성공!");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 410) {
        alert("인증 기한이 만료되었습니다. 다시 인증번호를 발급 받으세요");
      } else if (e.response.status === 404) {
        alert("일치하지 않는 이메일 입니다.");
      } else if (e.response.status === 401) {
        alert("인증번호가 틀렸습니다.");
      }
    }
  };

  return (
    <FormProvider {...form}>
      <Container
        component={Paper}
        elevation={6}
        sx={{ height: "65vh", width: "25vw" }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" marginTop={"2rem"}>
            회원가입
          </Typography>

          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <UserId item />
              </Grid>
              <Grid item xs={4}>
                <Button onClick={IdCheck} variant="contained">
                  중복 확인
                </Button>
              </Grid>
              <UserPassword />
              <PasswordCheck />
              <UserNickname />
              <Grid item xs={8}>
                <UserEmail item />
              </Grid>
              <Grid item xs={4}>
                <Button onClick={certificateEmail} variant="contained">
                  이메일 인증
                </Button>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id="authKey"
                  value={authKey}
                  onChange={handleAuthKeyChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Button onClick={EmailAuth} variant="contained">
                  인증번호 확인
                </Button>
              </Grid>
              <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                variant="outlined"
                disabled={!form.formState.isValid}
              >
                회원 가입
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    component={RouterLink}
                    to={"/login"}
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    로그인
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  );
};

export default Singup;
