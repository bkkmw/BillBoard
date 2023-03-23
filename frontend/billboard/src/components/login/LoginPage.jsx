import React from "react";
import { Link as RouterLink } from "react-router-dom";

import UserId from "./UserId";
import UserPassword from "./UserPassword";
import PswdFindPage from "./PswdFindPage";
import IdFindPage from "./IdFindPage";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";

import { useForm, FormProvider } from "react-hook-form";

const Login = () => {
  const form = useForm({
    defaultValues: {
      UserId: "",
      UserPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => console.log(data);
  const onError = (error) => console.log("ERROR", error);
  return (
    <FormProvider {...form}>
      <Grid container component="main" sx={{ height: "100%", width: "100vh" }}>
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item square component={Paper} elevation={6} xs={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Bill Board
            </Typography>
            <Box
              component="form"
              sx={{ mt: 1 }}
              onSubmit={form.handleSubmit(onSubmit, onError)}
            >
              <UserId />
              <br />

              <UserPassword />

              <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                variant="outlined"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs={4}>
                  <Link
                    component={RouterLink}
                    fontSize={2}
                    to={"/PswdFindPage"}
                  >
                    비밀번호찾기
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link component={RouterLink} fontSize={2} to={"/IdFindPage"}>
                    아이디찾기
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link component={RouterLink} fontSize={2} to={"/singup"}>
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
