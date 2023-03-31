// import React from "react";
// import style from "./ProfileFavorites.module.css";
// import { Link } from "react-router-dom";

// import { Card, Col, Row } from "antd";
// import { textAlign } from "@mui/system";

// const ProfileFavorites = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         // marginTop: "3rem",
//         marginBottom: "3rem",
//       }}
//     >
//       <span
//         style={{ fontSize: "3rem", textAlign: "start", marginBottom: "1.5rem" }}
//       >
//         즐겨찾기
//       </span>
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

// export default ProfileFavorites;

import * as React from "react";
import style from "./ProfileFavorites.module.css";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ProfileFavorites = () => {
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
      <div
        style={{
          width: "79vw",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
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
      </div>
    </div>
  );
};

export default ProfileFavorites;
