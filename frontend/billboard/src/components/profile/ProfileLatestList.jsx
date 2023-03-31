// import React from "react";
// import { Link } from "react-router-dom";

// import { Card, Col, Row } from "antd";

// // const { Meta } = Card;
// const ProfileLatestList = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         marginTop: "3rem",
//         marginBottom: "3rem",
//       }}
//     >
//       <span style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>최신기록</span>
//       <Row gutter={(20, 20)}>
//         <Col span={12}>
//           {/* <Link to = {`detail/:${gameid}`}/> */}
//           <Link to="/">
//             <Card
//               hoverable
//               style={{
//                 width: 240,
//                 border: "1px solid #000000",
//               }}
//               cover={
//                 <img
//                   alt="example"
//                   src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
//                 />
//               }
//             >
//               <span>안녕하세요</span>
//               {/* <Meta
//                 title="Europe Street beat"
//                 description="www.instagram.com"
//               /> */}
//             </Card>
//           </Link>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ProfileLatestList;

import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// const { Meta } = Card;
const ProfileLatestList = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
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
        최신기록
      </span>
      <div
        style={{
          width: "57vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Card sx={{ width: "18vw" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="320"
              image="https://cataas.com/cat"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: "18vw" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="320"
              image="https://cataas.com/cat"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: "18vw" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="320"
              image="https://cataas.com/cat"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default ProfileLatestList;
