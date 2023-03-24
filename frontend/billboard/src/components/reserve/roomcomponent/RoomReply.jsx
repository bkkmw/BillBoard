import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeReply } from '../../../store/reserve';

const RoomReply = ({replies, roomId}) => {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    const data = {
      roomId:roomId,
      content:"someting",
      userId:"string"
    }
    dispatch(makeReply(data)).then((res)=>{
      console.log(res)
  })
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>

      {replies.map((reply, i) => {
        return(<>
                    <div>댓글작성자: {reply.userId}</div>
                    <div>댓글: {reply.content}</div>
                    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="reply"
      name="reply"
      rules={[
        {
          required: true,
          message: 'Please input your reply!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
        </>)
      })}
      
    </div>
  );
};

export default RoomReply;