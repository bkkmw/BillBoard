import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReply, getReply, makeReply } from "../../../store/reserve";
import { CloseCircleOutlined } from "@ant-design/icons";
import { width } from "@mui/system";
import { selectUser } from "../../../store/user";

const RoomReply = ({ replies, roomId, reload }) => {
  const inputRef = useRef();
  // Todo: userId 수정 예정
  const userId = useSelector(selectUser).loginUser.userId;
  const dispatch = useDispatch();
  const onFinish = (values) => {
    // console.log(values)

    const data = {
      roomId: roomId,
      data: {
        content: values.reply,
        userId: userId,
      },
    };
    dispatch(makeReply(data)).then((res) => {
      reload();
    });
    // console.log("Success:", values);
    inputRef.current?.setFieldsValue({ reply: "" });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {replies.map((reply, i) => {
        return (
          <>
            {/* <div>댓글작성자: {reply.userId}</div>
            <div>댓글: {reply.content}</div>
            <div>댓글id:{reply.replyId}</div>
            {reply.userId === userId && (
              <>
                <CloseCircleOutlined
                  onClick={() => {
                    dispatch(deleteReply(reply.replyId)).then((res) => {
                      reload();
                    });
                  }}
                />
              </>
            )} */}
          </>
        );
      })}
      <Form
        ref={inputRef}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          display: "flex",
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          // label="reply"
          name="reply"
          rules={[
            {
              required: true,
              message: "Please input your reply!",
            },
          ]}
        >
          <Input
            style={{ width: "24.8vw", height: "7vh", fontSize: "1.5rem" }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "5.5vw",
              height: "7vh",
              fontSize: "1.4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            댓글 입력
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RoomReply;
