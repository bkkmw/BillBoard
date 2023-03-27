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

import { useForm, FormProvider, useWatch } from "react-hook-form";

import { useSelector } from "react-redux";

const Singup = () => {
  const navigate = useNavigate();
  const [emailSended, setEmailSended] = useState(false);

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
        navigate("/");
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
    const email = form.watch("UserEmail");
    // console.log("안녕", email);ㄴ
    try {
      const response = await httpClient.post("users/email-auth", {
        email: email,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    setEmailSended(true);
  };
  return (
    <FormProvider {...form}>
      <Container
        component={Paper}
        elevation={6}
        sx={{ height: "100%", width: "50vh" }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
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
                <Link component={RouterLink} to={"/login"} variant="body2">
                  Already have an account? 로그인 ㄱㄱ
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  );
};

export default Singup;
