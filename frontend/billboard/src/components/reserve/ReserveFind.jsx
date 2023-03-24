import React, { useEffect, useRef, useState } from 'react';

import { Button, Col, List, Row } from 'antd';
import ReserveFindAddress from './ReserveFindAddress';
import { getRoom } from '../../store/reserve';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

let dateList = []
for (let i = 0; i<7; i++ ) {
    const today = new Date()
    today.setDate(today.getDate()+i)
    dateList.push(today.toLocaleDateString())
}

const ReserveFind = () => {
  const dispatch = useDispatch()

    const [address, setAddress] = useState('')
    const [isAddressOpen, setIsAddressOpen] = useState(false)
    const [isChildAddressOpen, setIsChildAddressOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const [rooms, setRooms] = useState()
    // Todo: rejected 
    useEffect(()=>{
      dispatch(getRoom())
      .then((data) => {console.log(data)
      setRooms(data.payload.rooms)}
      )
      .catch((error) => {console.log(error)})
    },[])
    
    // rooms : [
// {
//     roomId : 방아이디(long)
//     hostId : 방장아이디(String)
//     title : 방제목(String)
//     personCount : 현재인원(int)
//     personLimit : 최대인원(int)
//     location : 장소(String)
//     date : 시간(Date)
//     }, ...
//     ]


    return (
        <div>
            <Row>
                <Col span={12}>
                    <Row>
            <Button type='primary' onClick={()=>{setIsAddressOpen(true)}}>{address===''?'지역별':address}</Button>
            </Row>
            <Row>
            <List
dataSource={dateList}
renderItem={(item) => (
  <List.Item className={`list_item_hover ${item===date.toLocaleDateString()&&'list_item_select'}`} onClick={()=>{setDate(new Date(item))
  }}>
    {item}
  </List.Item>
)}
/>
</Row>
            <ReserveFindAddress Open={isAddressOpen} childrenDrawer={isChildAddressOpen} setAddress={setAddress} setChildrenDrawer={setIsChildAddressOpen} onClose={() => setIsAddressOpen(false)}/>
            </Col>
            <Col span={12}>
            <List
dataSource={rooms}
renderItem={(item) => (
  <List.Item className={`list_item_hover ${item===date.toLocaleDateString()&&'list_item_select'}`}>
    <Link to={`/room/${item.roomId}`}>{
      `날짜:${item.date},
      방장ID:${item.hostID},
      location:${item.location},
      personCount:${item.personCount},
      personLimit:${item.personLimit},
      roomId:${item.roomId},
      title:${item.title}
   `}</Link>
  </List.Item>
)}
/>
            </Col>
            </Row>
        </div>
    );
};

export default ReserveFind;