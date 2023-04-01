import { React, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { Button, Checkbox, Col, Form, Rate, Row, Slider, Drawer } from "antd";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
export default function GameSearch({ open, onClose, gameData, search }) {
  const inputRef = useRef();
  const onFinish = (values) => {
    let newData = { ...gameData };
    for (const [value, v] of Object.entries(values)) {
      if (value === "Genre" && v !== undefined) {
        for (const genre of v) {
          newData[genre] = "true";
        }
        continue;
      } else if (v) {
        newData[value] = v;
      }
    }
    newData = { ...newData, name: inputRef.current.value };
    search(newData);
    // console.log(newData)
  };
  const checkboxes = [
    ["strategy", "전략 게임"],
    ["family", "가족 게임"],
    ["party", "파티 게임"],
    ["abstract", "추상 게임"],
    ["thematic", "영화적 게임"],
    ["war", "전쟁 게임"],
    ["customizable", "커스텀 게임"],
    ["children", "어린이 게임"],
  ];

  return (
    <Drawer
      title="Basic Drawer"
      placement="left"
      onClose={onClose}
      open={open}
      width={520}
    >
      <Box
        sx={{
          width: "70vw",
          maxWidth: "100%",
          marginBottom: "3rem",
        }}
      >
        <TextField
          fullWidth
          label="게임 이름을 입력하시오"
          id="gamesearch"
          inputRef={inputRef}
        />
      </Box>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item name="maxplaytime" label="플레이시간">
          <Slider
            max={150}
            marks={{
              0: "0",
              30: "30",
              60: "60",
              90: "90",
              120: "120",
              150: "150",
            }}
          />
        </Form.Item>
        <Form.Item name="maxplayers" label="인원수">
          <Slider
            max={15}
            marks={{
              0: "1",
              2: "2",
              4: "4",
              6: "6",
              10: "10",
              15: "15",
            }}
          />
        </Form.Item>
        <Form.Item name="averageWeight" label="난이도">
          <Slider
            max={5}
            marks={{
              0: "0",
              1: "1",
              2: "2",
              3: "3",
              4: "4",
              5: "5",
            }}
          />
        </Form.Item>
        <Form.Item name="average" label="평점">
          <Rate />
        </Form.Item>

        <Form.Item name="Genre" label="genre">
          <Checkbox.Group>
            <Row>
              {checkboxes.map((genre, i) => {
                return (
                  <Col span={12} key={genre + i}>
                    <Checkbox
                      value={genre[0]}
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      {genre[1]}
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
    // <Box component="form">

    //   <Grid container spacing={3}>
    //     {checkboxes.map((checkbox, index) => (
    //       <Grid item xs={3} key={index}>
    //         <FormControlLabel
    //           control={<Checkbox defaultChecked={checkbox.checked} />}
    //           label={checkbox.label}
    //         />
    //       </Grid>
    //     ))}
    //   </Grid>
    //   <Button type="submit" fullWidth variant="outlined">
    //     제출
    //   </Button>
    //   <hr />
    // </Box>
  );
}
