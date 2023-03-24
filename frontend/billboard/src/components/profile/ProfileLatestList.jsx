import React from "react";
import { Link } from "react-router-dom";

import { Card, Col, Row } from "antd";

const { Meta } = Card;
const ProfileLatestList = () => {
  return (
    <div>
      <Row gutter={(20, 20)}>
        <Col span={12}>
          {/* <Link to = {`detail/:${gameid}`}/> */}
          <Link to="/">
            <Card
              hoverable
              style={{
                width: 240,
                border: "1px solid #000000",
              }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <span>안녕하세요</span>
              {/* <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              /> */}
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileLatestList;
