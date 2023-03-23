import React from "react";
import { Link as RouterLink } from "react-router-dom";

import UserId from "./UserId";
import UserPassword from "./UserPassword";
import UserNickname from "./UserNickname";
import UserEmail from "./UserEmail";
import PasswordCheck from "./PasswordCheck";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useForm, FormProvider } from "react-hook-form";

const Singup = () => {
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

  const onSubmit = (data) => console.log(data);
  const onError = (error) => console.log("ERROR", error);

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
            onSubmit={form.handleSubmit(onSubmit, onError)}
          >
            <Grid container spacing={2}>
              <UserId />
              <UserPassword />
              <PasswordCheck />
              <UserNickname />
              <UserEmail />
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
                  Already have an account? Sign in
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
