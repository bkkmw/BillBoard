import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReply, getReply, makeReply } from '../../../store/reserve';
import { CloseCircleOutlined } from '@ant-design/icons';

const RoomReply = ({replies, roomId, reload}) => {
  const inputRef = useRef()
  // Todo: userId 수정 예정
  const userId = "string"
  const dispatch = useDispatch()
  const onFinish = (values) => {
    // console.log(values)
    
    const data = {
      roomId:roomId,
      content:values.reply,
      userId:userId
    }
    dispatch(makeReply(data)).then((res)=>{
      reload()
  })
    console.log('Success:', values);
    inputRef.current?.setFieldsValue({reply:''})
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
                    <div>댓글id:{reply.replyId}</div>
                    {reply.userId === userId&&<><CloseCircleOutlined onClick={()=>{
                      dispatch(deleteReply(reply.replyId)).then((res)=>{
                        reload()
                      })
                    }}/></>
                    
                    }
                    
                    
        </>)
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
    }}
    initialValues={{
      remember: false,
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