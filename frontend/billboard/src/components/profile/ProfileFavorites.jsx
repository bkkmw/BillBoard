import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useRouteLoaderData, useNavigate } from "react-router-dom";
import style from "./ProfileFavorites.module.css";

import { getDetails, getFavorites } from "../../store/boardgames";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Start } from "@mui/icons-material";

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
        // console.log(res);
        if (res.payload !== undefined) {
          setFavorites(res.payload.favorites);
        }
      });
    };
    handleFavorite();
  }, [userId]);
  // console.log(favorites);

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
                style={{ textDecoration: "none" }}
              >
                <div className={style.flip} key={index}>
                  <div className={style.card}>
                    <div className={style.front}>
                      <Card sx={{ width: "18vw" }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="320"
                            image={favorite.image}
                            style={{ objectFit: "fill" }}
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
                              }}
                            >
                              {favorite.name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </div>
                    <div className={style.back}>
                      <Card sx={{ width: "18vw" }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="320"
                            image={favorite.image}
                            style={{
                              objectFit: "fill",
                              // transform: "rotateY(180deg)",
                            }}
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
                                // transform: "rotateY(180deg)",
                              }}
                            >
                              {favorite.name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>즐겨찾기를 등록해 주세요</div>
      )}

      {/* {favorites ? (
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
                style={{ textDecoration: "none" }}
              >
                <Card key={index} sx={{ width: "18vw" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="320"
                      image={favorite.image}
                      style={{ objectFit: "fill" }}
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
                        }}
                      >
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
      )} */}
    </div>
  );
};

export default ProfileFavorites;
