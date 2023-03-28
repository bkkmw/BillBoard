import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { deleteRoom, getRoomInfo } from '../../store/reserve';
import RoomEntry from './roomcomponent/RoomEntry';
import RoomReply from './roomcomponent/RoomReply';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import ReserveForm from './ReserveForm';
import RoomLocation from './roomcomponent/RoomLocation';

const Room = () => {
    // Todo: userId값 받아오기
    const userId = "string"
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const roomId = useRouteLoaderData("room")
    const [modalOpen, setModalOpen] = useState(false)
    const [roomData, setRoomData] = useState()
    const reload = () => {
        dispatch(getRoomInfo(roomId)).then((res) => {
            setRoomData(res.payload.room)
            
        })
    }
    useEffect(() => {
        
        reload()
    }, [])
    useEffect(() => {
        reload()
    }, [modalOpen])
    return (
        <div >
            
            {roomData && <>

                <hr />
                <div>
                    방ID:{roomData.roomInfo.roomId}
                    방장:{roomData.roomInfo.hostId}
                    장소:{roomData.roomInfo.location}
                    인원:{roomData.roomInfo.personCount}
                    제한인원:{roomData.roomInfo.personLimit}
                    방이름:{roomData.roomInfo.title}
                    lat:{roomData.roomInfo.lat}
                    lng:{roomData.roomInfo.lng}
                </div>
                <hr />
                <RoomReply replies={roomData.replies} roomId={roomId} reload={reload} />
                <RoomEntry entries={roomData.entries} roomId={roomId} reload={reload} />
                <RoomLocation lat={roomData.roomInfo.lat} lng={roomData.roomInfo.lng}/>

                {/* height:window.innerHeight*0.3, width:window.innerWidth*0.3 */}

                <hr />
                {roomData.roomInfo.hostId === userId && <><Button onClick={() => {
                    // Todo: 500오류 해결해야함
                    dispatch(deleteRoom(roomId)).then((res) => {
                        console.log(res)
                        navigate('/reserve/find', { replace: true })
                    }

                    )
                }}>방삭제</Button></>}
                <hr />
                {roomData.roomInfo.hostId === userId && <>
                    <Button onClick={() => {
                        setModalOpen(true)
                    }}>방정보수정</Button>
                    <Modal footer={null} bodyStyle={{ height: window.innerHeight * 0.8 }} open={modalOpen} title="Basic Modal" width={window.innerWidth * 0.8} onCancel={() => {
                        setModalOpen(false)
                    }}>
                        <ReserveForm data={roomData.roomInfo} roomId={roomId} setModalOpen={setModalOpen} />
                    </Modal>
                </>}
            </>}

        </div>
    );
};

export default Room;