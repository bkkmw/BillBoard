import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getReply, makeReply } from '../../../store/reserve';

const RoomReply = ({replies, roomId}) => {
  const dispatch = useDispatch()
  const [replyList, setReplyList] = useState([])
  useEffect(()=>{
    setReplyList(replies)
  },[])
  const onFinish = (values) => {
    // console.log(values)
    // Todo: userId 수정 예정
    const data = {
      roomId:roomId,
      content:values.reply,
      userId:"string"
    }
    dispatch(makeReply(data)).then((res)=>{
      dispatch(getReply(roomId)).then((resdata)=>{
        // console.log(resdata)
        setReplyList(resdata.payload.replies)
      })
  })
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>

      {replyList.map((reply, i) => {
        return(<>
                    <div>댓글작성자: {reply.userId}</div>
                    <div>댓글: {reply.content}</div>
                    
        </>)
      })}
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
      
    </div>
  );
};

export default RoomReply;