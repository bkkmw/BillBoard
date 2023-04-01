import React, { useEffect, useState } from 'react';
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, TextField } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBoardGames } from '../../store/boardgames';
import { Badge, Space, Switch } from 'antd';
import { selectgameroom, setGame } from '../../store/gameroom';

const GameroomSearch = ({ setGameDetail, showModal }) => {
    const [show, setShow] = useState(true);
    const selectgameInfo = useSelector(selectgameroom).gameInfo
    const dispatch = useDispatch()
    const inputRef = useRef()
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
    const [boardReview, setBoardReview] = useState([]);
    const boards = (name) => {
        dispatch(getBoardGames({ ...gameData, 'name': name })).then((response) => {
            console.log(response)
            setBoardReview(response.payload["review"]);
        });
    };
    useEffect(() => {
        console.log(selectgameInfo)
    }, [selectgameInfo])
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}
            >
                <Button
                    type="primary"
                    style={{
                        fontSize: "1.5rem",
                        width: "8vw",
                        height: "6vh",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    추천 받기
                </Button>
                <TextField fullWidth label="게임 이름을 입력하시오" id="gamesearch" inputRef={inputRef} />
                <Button style={{ fontSize: "1.5rem", marginRight: "1.2rem" }} onClick={() => { boards(inputRef.current.value) }}>
                    Submit
                </Button>
            </div>
            <Grid style={{ width: "42vw", height: "50vh", overflowY: "scroll" }}>
                <div
                    style={{
                        width: "42vw",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "2rem",
                        paddingLeft: "1.3rem",
                    }}
                >{boardReview.map((game, i) => (
                    <Card sx={{ width: "12vw" }} key={game + i}>

                        <CardActionArea >
                            <CardMedia
                                component="img"
                                height="150"
                                image={`${game.image}`}
                                alt="green iguana"
                                onClick={() => {
                                    setGameDetail(game)
                                    showModal()
                                }}
                            />
                            <CardContent
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    style={{
                                        display: "flex",

                                        alignItems: "center",

                                        marginBottom: "0",
                                    }}
                                >
                                    {game.name}
                                </Typography>{selectgameInfo.gameId === game.gameId ?
                                    <Button color="success" onClick={() => {
                                        dispatch(setGame({ gameId: "" }))
                                    }}>해제</Button> : <Button onClick={() => { dispatch(setGame(game)) }}>선택</Button>}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}

                </div>
            </Grid >

        </>

    );
};

export default GameroomSearch;