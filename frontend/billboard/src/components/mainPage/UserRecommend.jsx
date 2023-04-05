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
      // console.log("호에엥", res);
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
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          {recommDatas.map((data, index) => (
            <SwiperSlide key={index} style={{ height: "9vh" }}>
              <Link
                to={`/detail/${data.gameId}`}
                state={{ gameId: data.gameId, isProps: true }}
              >
                <Card sx={{ width: "20vw", height: "100%" }}>
                  <CardActionArea>
                    <CardMedia
                      sx={{ borderRadius: "16px" }}
                      component="img"
                      image={data.image}
                      style={{ height: "40vh" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                          height: "5.5vh",
                          overflowY: "scroll",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          maxWidth: "30ch",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
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
