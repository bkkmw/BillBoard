import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getuser } from "../../store/gameroom";

const { Option } = Select;
const UserListDrawer = ({ showDrawer, onClose, setOpen, open, addUser }) => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(getuser(values))
      .then((res) => {
        // console.log(res)
        if (res.payload.status === 200) {
          console.log("로그인 성공");
          // userId가 null로 와서 추가해줌
          const userInfo = {
            ...res.payload.data.userInfo,
            userId: values.userId,
          };
          addUser(userInfo);
          // console.log(userInfo)
          // addUser(userInfo)
        } else if (res.payload.response.status === 401) {
          console.log("아이디랑 비번이 일치하지 않음");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Drawer
        title="Add User"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="userId"
                label="ID"
                rules={[
                  {
                    required: true,
                    message: "Please enter user id",
                  },
                ]}
              >
                <Input placeholder="Please enter user id" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="PASSWORD"
                rules={[
                  {
                    required: true,
                    message: "password",
                  },
                ]}
              >
                <Input.Password placeholder="Please enter user password"/>
              </Form.Item>
              <Form.Item>
                <Button type={"primary"} htmlType={"submit"}>
                  불러오기
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default UserListDrawer;
