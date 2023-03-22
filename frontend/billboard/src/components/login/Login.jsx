import React from "react";
import { Link as RouterLink } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100%", width: "100%" }}>
      <Grid
        item
        md={7}
        sm={4}
        xs={false}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item square component={Paper} elevation={6} md={5} sm={8} xs={12}>
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
            noValidate
            component="form"
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              required
              autoComplete="id"
              id="id"
              label="ID"
              margin="normal"
              name="id"
            />
            <TextField
              fullWidth
              required
              autoComplete="current-password"
              id="password"
              label="Password"
              margin="normal"
              name="password"
              type="password"
            />

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
                <Link component={RouterLink} fontSize={2} to="">
                  비밀번호찾기
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link component={RouterLink} fontSize={2} to="">
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
  );
};

export default Login;
