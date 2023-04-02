import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useRouteLoaderData, useNavigate } from "react-router-dom";
import style from "./ProfileFavorites.module.css";

import { getDetails, getFavorites } from "../../store/boardgames";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ProfileFavorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useRouteLoaderData("profile");
  const [favorites, setFavorites] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [favoriteData, setFavoriteData] = useState(null);
  // 보드게임 즐겨찾기 조회
  useEffect(() => {
    const handleFavorite = () => {
      dispatch(getFavorites(userId)).then((res) => {
        setFavorites(res.payload.favorites);
      });
    };
    handleFavorite();
  }, []);
  console.log(favorites);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "3rem",
        marginLeft: "3.5rem",
      }}
    >
      <span
        style={{
          fontSize: "3rem",
          fontWeight: "bolder",
          marginBottom: "1.5rem",
          textAlign: "start",
        }}
      >
        즐겨찾기
      </span>
      {favorites ? (
        <div
          style={{
            width: "79vw",
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {favorites.map((favorite, index) => {
            return (
              <Link
                key={index}
                to={`/detail/${favorite.gameId}`}
                state={favorite}
              >
                <Card key={index} sx={{ width: "18vw" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="320"
                      image={favorite.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {favorite.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>즐겨찾기를 등록해 주세요</div>
      )}
    </div>
  );
};

export default ProfileFavorites;
