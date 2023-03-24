import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteLoaderData } from 'react-router';
import { getRoomInfo } from '../../store/reserve';
import RoomReply from './roomcomponent/RoomReply';

const Room = () => {
    const dispatch = useDispatch()
    const roomId = useRouteLoaderData("room")
    const [roomData, setRoomData] = useState()
    useEffect(()=>{
        dispatch(getRoomInfo(roomId)).then((res)=>{
            setRoomData(res.payload.room)
        })
        
        // setRoomData(dispatch(getRoomInfo.payload))
    },[])
    useEffect(()=>{
        console.log(roomData)
    },[roomData])
    return (
        <div>
            {roomData&&<>
            
                <hr/>
            <div>
            방ID:{roomData.roomInfo.roomId}
            방장:{roomData.roomInfo.hostId}
            장소:{roomData.roomInfo.location}
            인원:{roomData.roomInfo.personCount}
            제한인원:{roomData.roomInfo.personLimit}
            방이름:{roomData.roomInfo.title}
            </div>
            <hr/>
            <RoomReply replies={roomData.replies} roomId={roomId}/>
            {/* <div>댓글:{roomData.replies.map((reply,i) => {
                return(<>
                    <div>댓글작성자: {reply.replyId}</div>
                    <div>댓글: {reply.content}</div>
                    </>
                )

            })}</div> */}


            <hr/>
            <div>플레이어:{roomData.entries.map((entry, i) => {
                return(<>
                <div>userId: {entry.userId}</div>
                </>)
            })}</div>
            </>}

            
        </div>
    );
};

export default Room;