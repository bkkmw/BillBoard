import { React, useState, useEffect } from "react";
import style from "./MainPage.module.css";
import UserRecommend from "./UserRecommend";
import GameSearch from "./GameSearch";
import { useDispatch } from "react-redux";
import {
  Modal,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import GameStart from "../GameStart";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

import DetailPage from "../detail/DetailPage";

import { getBoardGames } from "../../store/boardgames";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./MainPage.css";

// import required modules
import { FreeMode, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(false);
  const [gameData, setGameData] = useState({
    name: "",
    maxplaytime: 1000,
    maxplayers: 0,
    average: 5,
    averageWeight: 0,
    strategy: "",
    family: "",
    party: "",
    abstract: "",
    thematic: "",
    war: "",
    customizable: "",
    children: "",
  });
  const { login } = useSelector((state) => state.user);

  // 평균, 랭킹, 난이도, 리뷰, 날짜순 기본 추천
  const [boardAverage, setBoardAverage] = useState([]);
  const [boardRanking, setBoardRanking] = useState([]);
  const [boardWeight, setBoardWeight] = useState([]);
  const [boardReview, setBoardReview] = useState([]);
  const [boardDate, setBoardDate] = useState([]);
  const boards = (data) => {
    dispatch(getBoardGames(data)).then((response) => {
      // console.log(response)
      setBoardAverage(response.payload["average"]);
      setBoardRanking(response.payload["rank"]);
      setBoardWeight(response.payload["weights"]);
      setBoardReview(response.payload["review"]);
      setBoardDate(response.payload["yearpublished"]);
      setIsSearch(false);
    });
  };
  // 기본 추천 목록조회 api
  useEffect(() => {
    boards(gameData);
  }, []);
  return (
    <>
      <GameStart />
      <div style={{ marginTop: "10vh", height: "2vh", width: "80vw" }}>
        <GameSearch
          open={isSearch}
          onClose={() => {
            setIsSearch(false);
          }}
          setGameData={setGameData}
          gameData={gameData}
          search={boards}
        />

        <Button
          style={{
            position: "fixed",
            bottom: "9rem",
            right: "3rem",
            backgroundColor: "transparent",
          }}
          onClick={() => {
            setIsSearch(true);
          }}
        >
          <SearchOutlinedIcon
            sx={{
              color: "black",
              fontSize: "100px",
            }}
          />
        </Button>
      </div>
      {boardDate && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "spaceBetween",
            marginTop: "3rem",
            marginBottom: "10vh",
            width: "80vw",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#B0DAFF",
              borderRadius: "3rem",
              margin: "2rem",
              padding: "2rem",
            }}
          >
            <Typography
              align="center"
              variant="h3"
              color="black"
              style={{ fontSize: "2rem" }}
            >
              맞춤 추천
            </Typography>
            <UserRecommend />
          </Box>
          <div>
            <Typography
              align="left"
              variant="h3"
              color="black"
              style={{ fontSize: "2rem" }}
            >
              평점 높은 게임
            </Typography>
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
              {boardAverage.map((data, index) => (
                <SwiperSlide
                  key={index}
                  style={{ height: "10vh", width: "25vw" }}
                >
                  <Link
                    to={`/detail/${data.gameId}`}
                    state={data}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        borderRadius: "2rem",
                        width: "20vw",
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          sx={{ borderRadius: "16px" }}
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
          </div>
          <div>
            <Typography
              align="left"
              variant="h3"
              color="black"
              style={{ fontSize: "2rem" }}
            >
              랭킹 높은 게임
            </Typography>
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              freeMode={true}
              navigation={true}
              modules={[FreeMode, Pagination, Navigation]}
              className="boardRanking"
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                paddingTop: "3rem",
                paddingBottom: "3rem",
              }}
            >
              {boardRanking.map((data, index) => (
                <SwiperSlide
                  key={index}
                  style={{ height: "9vh", width: "25vw" }}
                >
                  <Link
                    to={`/detail/${data.gameId}`}
                    state={data}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ width: "20vw" }}>
                      <CardActionArea>
                        <CardMedia
                          sx={{ borderRadius: "16px" }}
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
          </div>
          <div>
            <Typography
              align="left"
              variant="h3"
              color="black"
              style={{ fontSize: "2rem" }}
            >
              어려운 게임
            </Typography>
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              freeMode={true}
              navigation={true}
              modules={[FreeMode, Pagination, Navigation]}
              className="boardWeight"
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                paddingTop: "3rem",
                paddingBottom: "3rem",
              }}
            >
              {boardWeight.map((data, index) => (
                <SwiperSlide
                  key={index}
                  style={{ height: "9vh", width: "25vw" }}
                >
                  <Link
                    to={`/detail/${data.gameId}`}
                    state={data}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ width: "20vw" }}>
                      <CardActionArea>
                        <CardMedia
                          sx={{ borderRadius: "16px" }}
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
          </div>
          <div>
            <Typography
              align="left"
              variant="h3"
              color="black"
              style={{ fontSize: "2rem" }}
            >
              리뷰 많은 게임
            </Typography>
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              freeMode={true}
              navigation={true}
              modules={[FreeMode, Pagination, Navigation]}
              className="boardReview"
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                paddingTop: "3rem",
                paddingBottom: "3rem",
              }}
            >
              {boardReview.map((data, index) => (
                <SwiperSlide
                  key={index}
                  style={{ height: "9vh", width: "25vw" }}
                >
                  <Link
                    to={`/detail/${data.gameId}`}
                    state={data}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ width: "20vw" }}>
                      <CardActionArea>
                        <CardMedia
                          sx={{ borderRadius: "16px" }}
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
          </div>
          <div>
            <Typography
              align="left"
              variant="h3"
              color="black"
              style={{ fontSize: "2rem" }}
            >
              최신 게임
            </Typography>
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              freeMode={true}
              navigation={true}
              modules={[FreeMode, Pagination, Navigation]}
              className="boardDate"
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                paddingTop: "3rem",
                paddingBottom: "3rem",
              }}
            >
              {boardDate.map((data, index) => (
                <SwiperSlide
                  key={index}
                  style={{ height: "9vh", width: "25vw" }}
                >
                  <Link
                    to={`/detail/${data.gameId}`}
                    state={data}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ width: "20vw" }}>
                      <CardActionArea>
                        <CardMedia
                          sx={{ borderRadius: "16px" }}
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
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
