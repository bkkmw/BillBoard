import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Modal,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";

import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from "react-redux";

import { recommendGame } from "../../store/boardgames";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./UserRecommend.css";

// import required modules
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";
import { width } from "@mui/system";
import { Link } from "react-router-dom";

export default function UserRecommend() {
  const [recommDatas, setRecommDatas] = useState([]);
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state.user);
  // 유저별 1인 추천
  useEffect(() => {
    const userId = loginUser.userId;
    dispatch(recommendGame(userId)).then((res) => {
      console.log("호에엥", res);
      if (res.payload === undefined) {
        setRecommDatas(["리뷰를 등록하면 유저별 추천을 받을 수 있습니다."]);
      } else {
        setRecommDatas(res.payload.games);
      }
    });
  }, []);
  // console.log(recommDatas[0]);
  return (
    <Box>
      {recommDatas.length === 1 ? (
        <h1>{recommDatas[0]}</h1>
      ) : (
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          freeMode={true}
          navigation={true}
          modules={[FreeMode, Pagination, Navigation]}
          className="boardAverage"
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            paddingTop: "3rem",
            paddingBottom: "3rem",
          }}
        >
          {recommDatas.map((data, index) => (
            <SwiperSlide
              key={index}
              style={{
                backgroundColor: "transparent",
                height: "10vh",
                width: "25vw",
              }}
            >
              <Link
                style={{ textDecoration: "none" }}
                to={`/detail/${data.gameId}`}
                state={{ gameId: data.gameId, isProps: true }}
              >
                <Card sx={{ borderRadius: "2rem", width: "20vw" }}>
                  <CardActionArea>
                    <CardMedia
                      sx={{}}
                      component="img"
                      image={data.image}
                      style={{
                        height: "30vh",
                        objectFit: "fill",
                        marginTop: "11rem",
                      }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        // component="div"
                        style={{
                          height: "5vh",
                          overflowY: "scroll",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textDecoration: "none",
                        }}
                      >
                        {data.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
}
