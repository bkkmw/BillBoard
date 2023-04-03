import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import GameDetail from "../detail/GameDetail";
import GameDescription from "../detail/GameDescription";

import { useSelector, useDispatch } from "react-redux";

import { recommendGame } from "../../store/boardgames";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./UserRecommend.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
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
      setRecommDatas(res.payload.games);
    });
  }, []);
  // console.log(recommDatas);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{ maxWidth: "70vw", maxHeight: "50vh", marginBottom: "2rem" }}
      >
        {recommDatas.map((data, index) => (
          <SwiperSlide key={index}>
            <Link to={`/detail/${data.gameId}`} state={{'gameId':data.gameId, 'isProps':true}}>
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
    </>
  );
}
