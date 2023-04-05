import { React, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import httpClient from "../../utils/axios";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const PswdFindPage = () => {
  // 이메일, 아이디 유효성 검사

  const [validEmail, setValidEmail] = useState(false);
  const [validId, setValidId] = useState(false);
  // 이메일 검사
  function checkEmail(event) {
    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    const email = event.target.value;
    // console.log(event.target.value);
    if (emailRegex.test(email)) {
      setValidEmail(true);
    } else setValidEmail(false);
  }
  // 아이디 검사
  function checkId(event) {
    const id = event.target.value;

    if (id.length > 2) {
      setValidId(true);
    } else {
      setValidId(false);
    }
  }
  // next버튼을 누르면 비밀번호찾기 api에 통신하고 결과 페이지로 넘어감
  const navigate = useNavigate();
  function submitForm(event) {
    event.preventDefault();
    // console.log(event.target.email.value);
    const userEmail = event.target.email.value;
    const userId = event.target.id.value;

    httpClient
      .post("/users/find-password", {
        email: userEmail,
        userId: userId,
      })
      .then((data) => {
        if (data.status === 200) {
          navigate("/FindResult", {
            state: { mode: "Password", email: userEmail, id: userId },
          });
        }
      })
      .catch((error) => {
        console.log("에러", error);
        if (error.response.status === 404) {
          alert("등록되지 않은 아이디,이메일 입니다.");
        }
      });
  }
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 4,
            borderRadius: 2,
            padding: 4,
          }}
        >
          <Typography component="h1" variant="h5">
            비밀번호 찾기
          </Typography>
          <Box component="form" onSubmit={submitForm} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              onChange={checkEmail}
            />
            <span
              className="check-msg"
              style={{ color: validEmail ? "green" : "black" }}
            >
              {validEmail ? "유효한 Email 입니다." : "~~~@~~~~.~~~"}
            </span>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="아이디"
              name="id"
              autoComplete="email"
              onChange={checkId}
            />
            <span
              className="check-msg"
              style={{ color: validId ? "green" : "black" }}
            >
              {validId ? "유효한 아이디 입니다." : "최소 3글자 입니다."}
            </span>
            <Button
              disabled={!validEmail || !validId}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              NEXT
            </Button>
            <footer>
              <Link
                component={RouterLink}
                to="/login"
                style={{ textDecoration: "none" }}
              >
                뒤로 가기
              </Link>
            </footer>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PswdFindPage;
