import { PlusOutlined } from '@ant-design/icons';
import {

  DatePicker,
  Form,
  Input,
  Button,
  InputNumber,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { makeRoom } from '../../store/reserve';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';

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
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};


const { TextArea } = Input;
const ReserveFormInput = ({location}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputRef = useRef()
  const [componentDisabled, setComponentDisabled] = useState(true);
  const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});
useEffect(()=>{
  if (location) {
    inputRef.current?.setFieldsValue({location: `${location}`})
  }
  
},[location])
const disabledRangeTime = (_, type) => {
  if (type === 'start') {
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
const onFinish = (values) =>{
  // Todo: hostId값 추가
  
  values = {...values, date:new Date(values.date.$d).toISOString(), hostId:'string'}
  dispatch(makeRoom(values))
  .then((data) => {console.log(data)
    // Todo: 방 ID받아서 navigate되게할것
    // navigate(`/room/${data.payload.roomId}`,{replace: true})
  }
  )
  .catch((error) => {console.log(error)})
  
}
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
        <Form.Item label="Title" name="title" rules={[
          {
            required: true,
            message: '제목을 입력하세요'
          }
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Date/Time" name="date" rules={[
          {
            required: true,
            message: '시간을 입력하세요'
          }
        ]}>
        <DatePicker
      format="YYYY-MM-DD HH:mm"
      disabledDate={disabledDate}
      showTime={{
        defaultValue: dayjs('00:00:00', 'HH:mm'),
      }}
    />
        </Form.Item>
        <Form.Item label="Location" name="location" rules={[
          {
            required: true,
            message: '장소를 입력하세요',
          },
        ]}>
          <Input  readOnly={true}/>
        </Form.Item>
        <Form.Item label="personLimit" name="personLimit" rules={[
          {
            required: true,
            message: '인원수를 입력하세요',
          },
        ]}>
          <InputNumber min={2} max={8}/>
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} htmlType={"submit"}>Submit</Button>
        </Form.Item>

      </Form>
    </>
  );
};
export default ReserveFormInput