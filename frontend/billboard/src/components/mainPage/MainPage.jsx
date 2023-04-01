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
} from "@mui/material";

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
const Main = () => {
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(false)
  const [gameData, setGameData] = useState({
    name: "",
    maxplaytime: 1000,
    maxplayers: 5,
    average: 0,
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

  // 평균, 랭킹, 난이도, 리뷰, 날짜순 기본 추천
  const [boardAverage, setBoardAverage] = useState([]);
  const [boardRanking, setBoardRanking] = useState([]);
  const [boardWeight, setBoardWeight] = useState([]);
  const [boardReview, setBoardReview] = useState([]);
  const [boardDate, setBoardDate] = useState([]);
  const boards = (data) => {
    dispatch(getBoardGames(data)).then((response) => {
      console.log(response)
      setBoardAverage(response.payload["average"]);
      setBoardRanking(response.payload["rank"]);
      setBoardWeight(response.payload["weights"]);
      setBoardReview(response.payload["review"]);
      setBoardDate(response.payload["yearpublished"]);
      setIsSearch(false)
    });
  };
  // 기본 추천 목록조회 api
  useEffect(() => {
    boards(gameData);
  }, []);

  return (<>{boardDate &&
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "spaceBetween",
        marginTop: "12vh",
        width: "70vw",
      }}
    >
      <span style={{ fontSize: "3rem", marginBottom: "2rem" }}>유저별</span>
      <UserRecommend />


      <div>
        <span style={{ fontSize: "3rem" }}>평균순</span>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[FreeMode, Pagination, Navigation]}
          className="boardAverage"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          {boardAverage.map((data, index) => (
            <SwiperSlide key={index}>
              <Link to={`/detail/${data.gameId}`} state={data}>
                <img
                  style={{ width: "350px", height: "350px", objectFit: "fill" }}
                  src={data.image}
                  alt="Slide 1"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <span style={{ fontSize: "3rem" }}>랭킹순</span>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="boardRanking"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          {boardRanking.map((data, index) => (
            <SwiperSlide key={index}>
              <Link to={`/detail/${data.gameId}`}>
                <img
                  style={{ width: "350px", height: "350px", objectFit: "fill" }}
                  src={data.image}
                  alt="Slide 1"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <span style={{ fontSize: "3rem" }}>난이도순</span>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="boardWeight"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          {boardWeight.map((data, index) => (
            <SwiperSlide key={index}>
              <Link to={`/detail/${data.gameId}`}>
                <img
                  style={{ width: "350px", height: "350px", objectFit: "fill" }}
                  src={data.image}
                  alt="Slide 1"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <span style={{ fontSize: "3rem" }}>리뷰순</span>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="boardReview"
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            {boardReview.map((data, index) => (
              <SwiperSlide key={index}>
                <Link to={`/detail/${data.gameId}`} state={data}>
                  <img
                    style={{
                      width: "350px",
                      height: "350px",
                      objectFit: "fill",
                    }}
                    src={data.image}
                    alt="Slide 1"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <span style={{ fontSize: "3rem" }}>출시일순</span>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="boardDate"
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            {boardDate.map((data, index) => (
              <SwiperSlide key={index}>
                <Link to={`/detail/${data.gameId}`}>
                  <img
                    style={{
                      width: "350px",
                      height: "350px",
                      objectFit: "fill",
                    }}
                    src={data.image}
                    alt="Slide 1"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </div>}
    <GameSearch open={isSearch} onClose={() => { setIsSearch(false) }} setGameData={setGameData} gameData={gameData} search={boards} />
    <Button onClick={() => { setIsSearch(true) }}>검색</Button></>
  );
};

export default Main;
