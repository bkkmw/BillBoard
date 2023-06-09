import React, { useState, useRef, useEffect } from "react";

// import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
// import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
// import OutlinedFlagOutlinedIcon from "@material-ui/icons/OutlinedFlagOutlined";
// import RestoreIcon from "@material-ui/icons/Restore";
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, makeStyles } from "@mui/material";
import { OutlinedFlagOutlined, PauseCircle, PlayCircle, RestoreOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { selectgameroom, setPlayTime } from "../../store/gameroom";

// const useStyle = makeStyles((theme) => ({
//     root: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center"
//     },
//     labelTime: {
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-around"
//     },
//     playButton: {
//         color: theme.status.play,
//         fontSize: "48px"
//     },
//     pauseButton: {
//         color: theme.status.pause,
//         fontSize: "48px"
//     },
//     flagButton: {
//         color: "",
//         fontSize: "48px"
//     },
//     restoreButton: {
//         color: "",
//         fontSize: "48px"
//     },
//     tableContainer: {
//         maxHeight: "70vh"
//     },
//     table: {
//         minWidth: 600
//     },
//     tableBody: {
//         alignItems: "space-around",
//         overflowY: "auto"
//     },
//     lapCell: {
//         display: "flex",
//         flexDirection: "row"
//     },
//     lapCellTypo: {
//         marginRight: 20
//     }
// }));

const lapsDefault = {
    lapsList: [],
    lastLapTime: 0,
    fastest: {
        lapTime: Infinity,
        index: -1
    },
    slowest: {
        lapTime: -1,
        index: -1
    }
};

const Stopwatch = () => {
    const dispatch = useDispatch()
    const time = useSelector(selectgameroom).playTime
    const setTime = (t) => {
        dispatch(setPlayTime(t))
    }
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState(lapsDefault);
    const intervalRef = useRef(0);
    useEffect(() => {
        setIsActive(true)
    }, [])
    const formatTime = () => {

        const sec = `${Math.floor(time) % 60}`.padStart(2, "0");
        const min = `${Math.floor(time / 60) % 60}`.padStart(2, "0");
        const hour = `${Math.floor(time / 3600)}`.padStart(2, "0");
        return (
            <>
                <Typography variant="h1">{[hour, min, sec].join(":")}</Typography>
                {/* <Box
                >
                    {["hr", "min", "sec"].map((unit) => (
                        <Typography key={unit} vairant="overline">
                            {unit}
                        </Typography>
                    ))}
                </Box> */}
            </>
        );
    };

    const handelPlayPause = () => {
        setIsActive(!isActive);
    };
    const handelReset = () => {
        setTime(0);
        setIsActive(false);
        setLaps(lapsDefault);
    };
    const handelLaps = () => {
        const lapTime = time - laps.lastLapTime;
        const thisLap = {
            lapIndex: laps.lapsList.length,
            lapTime: lapTime,
            totalTime: time
        };

        const newSlowest = { ...laps.slowest };
        if (thisLap.lapTime > laps.slowest.lapTime) {
            newSlowest.lapTime = thisLap.lapTime;
            newSlowest.index = laps.lapsList.length;
        }
        const newFastest = { ...laps.fastest };
        if (thisLap.lapTime < laps.fastest.lapTime) {
            newFastest.lapTime = thisLap.lapTime;
            newFastest.index = laps.lapsList.length;
        }

        const newLaps = {
            lapsList: [...laps.lapsList, thisLap],
            lastLapTime: Math.floor(time),
            slowest: newSlowest,
            fastest: newFastest
        };

        setLaps(newLaps);
    };

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setTimeout(() => setTime(time + 0.1), 100);
            return () => clearTimeout(intervalRef.current);
        }
    }, [time, isActive]);


    return (
        <>
            {/* <>{time}</> */}
            <Grid m={1}>
                <Grid item>{formatTime()}</Grid>
                <Grid item>
                    <ControlButtons
                        args={{
                            time,
                            isActive,

                            handelPlayPause,
                            handelLaps,
                            handelReset
                        }}
                    />
                </Grid>
                <Grid item>{laps.lapsList.length > 0 && <Laps laps={laps} />}</Grid>
            </Grid>
        </>
    );
};

const ControlButtons = ({
    args: { time, isActive, handelPlayPause, handelLaps, handelReset }
}) => {
    return (
        <>
            {/* play or pause stopwatch */}
            <Tooltip title={isActive ? "Pause" : "Play"}>
                <IconButton onClick={() => handelPlayPause()}>
                    {
                        {
                            true: <PauseCircle />,
                            false: <PlayCircle />
                        }[isActive]
                    }
                </IconButton>
            </Tooltip>
            {/* create new laps */}
            <Tooltip title={"Lap / Splits"}>
                <IconButton disabled={!isActive} onClick={() => handelLaps()}>
                    <OutlinedFlagOutlined />
                </IconButton>
            </Tooltip>
            {/* reset stopwatch */}
            <Tooltip title={"Reset"}>
                <IconButton disabled={time === 0} onClick={() => handelReset()}>
                    <RestoreOutlined />
                </IconButton>
            </Tooltip>
        </>
    );
};

const Laps = ({ laps }) => {

    const columns = [
        { id: "lapIndex", label: "Laps" },
        { id: "lapTime", label: "Time" },
        { id: "totalTime", label: "Total" }
    ];

    const formatTime = (time) => {
        const sec = `${Math.floor(time)}`.padStart(2, "0");
        const min = `${Math.floor(time / 60) % 60}`.padStart(2, "0");
        const hour = `${Math.floor(time / 3600)}`.padStart(2, "0");
        return (
            <Typography variant="body1">{[hour, min, sec].join(" : ")}</Typography>
        );
    };
    const formattedRow = (lap, index) => {
        return (
            <TableRow hover="true" key={index}>
                <TableCell >
                    <Typography>
                        {lap.lapIndex}
                    </Typography>
                    {laps.lapsList.length > 1 && laps.slowest.index === lap.lapIndex && (
                        <Typography>Slowest</Typography>
                    )}
                    {laps.lapsList.length > 1 && laps.fastest.index === lap.lapIndex && (
                        <Typography>Fastest</Typography>
                    )}
                </TableCell>
                <TableCell>{formatTime(lap.lapTime)}</TableCell>
                <TableCell>{formatTime(lap.totalTime)}</TableCell>
            </TableRow>
        );
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <colgroup>
                        {columns.map((column) => (
                            <col style={{ minWidth: "100px" }} />
                        ))}
                    </colgroup>
                    <TableHead>
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell key={column.id}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {laps.lapsList
                            .slice()
                            .reverse()
                            .map((lap, index) => formattedRow(lap, index))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Stopwatch;