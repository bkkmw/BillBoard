import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Button, InputNumber } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { correctRoom, makeRoom } from "../../store/reserve";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { selectUser } from "../../store/user";
import { fontSize } from "@mui/system";
import Animation3 from "../lottie/Animation3";
import httpClient from "../../utils/axios";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};
// eslint-disable-next-line arrow-body-style
const disabledDate = (current) => {
  console.log(current)
  // Can not select days before today and today
  return current && current < dayjs().add(-1, "day").endOf("day");
};

const { TextArea } = Input;
const ReserveFormInput = ({ location, data, roomId, setModalOpen }) => {
  const userId = useSelector(selectUser).loginUser.userId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });

  useEffect(() => {
    console.log(location)
    if (location.address_name) {
      inputRef.current?.setFieldsValue({
        location: `${location.address_name}`,
      });
    }
  }, [location]);
  useEffect(() => {
    console.log(data)
    if (data) {
      inputRef.current?.setFieldsValue({
        title: `${data.title}`,
        personLimit: `${data.personLimit}`,
        location: `${data.location}`,
      });
    }
  }, []);
  const disabledRangeTime = (_, type) => {
    if (type === "start") {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };
  const onFinish = (values) => {
    // console.log(values.date);
    let offset = values.date.$d.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    let dateOffset = new Date(values.date.$d.getTime() - offset);

    values = {
      ...values,
      date: dateOffset.toISOString(),
      lng: location.x,
      lat: location.y,
    };
    if (data) {
      dispatch(correctRoom({ values: values, roomId: roomId }))
        .then((res) => {
          console.log(res);
          setModalOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('방만들기')
      dispatch(makeRoom({ ...values, hostId: userId }))
        .then((res) => {
          navigate(`/room/${res.payload.data.roomId}`)

          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });


    }
  }
    ;
  return (
    <>
      <Form
        ref={inputRef}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label={<span style={{ fontSize: "1.3rem" }}>방제목</span>}
          name="title"
          rules={[
            {
              required: true,
              message: "제목을 입력하세요",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span style={{ fontSize: "1.3rem" }}>날짜</span>}
          name="date"
          rules={[
            {
              required: true,
              message: "시간을 입력하세요",
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            disabledDate={disabledDate}
            showTime={{
              defaultValue: dayjs("00:00:00", "HH:mm"),
            }}
          />
        </Form.Item>
        <Form.Item
          label={<span style={{ fontSize: "1.3rem" }}>장소</span>}
          name="location"
          rules={[
            {
              required: true,
              message: "장소를 입력하세요",
            },
          ]}
        >
          <Input readOnly={true} />
        </Form.Item>
        <Form.Item
          label={<span style={{ fontSize: "1.3rem" }}>인원</span>}
          name="personLimit"
          rules={[
            {
              required: true,
              message: "인원수를 입력하세요",
            },
          ]}
        >
          <InputNumber min={2} max={8} />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "end " }}>
          <Button
            type={"primary"}
            htmlType={"submit"}
            style={{
              width: "5vw",
              height: "5vh",
              fontSize: "1.5rem",
            }}
          >
            예약
          </Button>
        </Form.Item>
      </Form>
      <Animation3 />
    </>
  );
};
export default ReserveFormInput;
