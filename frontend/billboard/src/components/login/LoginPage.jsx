import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../store/user";

import UserId from "./UserId";
import UserPassword from "./UserPassword";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";

import { useForm, FormProvider } from "react-hook-form";

import Animation from "../lottie/Animation";

const Login = () => {
  const { login } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 유효성 검사
  const form = useForm({
    defaultValues: {
      UserId: "",
      UserPassword: "",
    },
    mode: "onChange",
  });

  // 로그인 api
  const onSubmit = (event) => {
    event.preventDefault;
    const user = {
      userId: form.watch("UserId"),
      password: form.watch("UserPassword"),
    };
    dispatch(doLogin(user)).then((data) => {
      // console.log("안녕하세요", data.payload.status);
      if (data.payload.status !== 200) {
        alert("회원정보가 일치하지 않습니다.");
        navigate("/login");
      } else {
        navigate("/main");
      }
    });
    // .catch((e) => console.log(e));
  };
  return (
    <FormProvider {...form}>
      <Grid
        container
        component="main"
        sx={{
          height: "100%",
          width: "70vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* <Grid
          item
          xs={6}
          sx={{
            // backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundImage: <LoadingScreen />,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        /> */}

        <Grid item xs={5} style={{ height: "50vh" }}>
          <Animation />
        </Grid>

        <Grid
          item
          square
          component={Paper}
          elevation={6}
          xs={4.5}
          style={{ height: "50vh" }}
        >
          <Box
            sx={{
              my: 8,
              // mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h3">
              Bill Board
            </Typography>
            <Box
              component="form"
              sx={{ mt: 1 }}
              onSubmit={form.handleSubmit(onSubmit)}
              width={"20vw"}
            >
              <UserId />
              <br />

              <UserPassword />

              <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                variant="outlined"
                disabled={!form.formState.isValid}
              >
                로 그 인
              </Button>
              <Grid container>
                <Grid item xs={4}>
                  <Link
                    component={RouterLink}
                    to={"/PswdFindPage"}
                    style={{ fontSize: "1rem", textDecorationLine: "none" }}
                  >
                    비밀번호찾기
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link
                    component={RouterLink}
                    to={"/IdFindPage"}
                    style={{ fontSize: "1rem", textDecorationLine: "none" }}
                  >
                    아이디찾기
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link
                    component={RouterLink}
                    to={"/singup"}
                    style={{ fontSize: "1rem", textDecorationLine: "none" }}
                  >
                    회원가입
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default Login;
