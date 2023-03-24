import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import UserListDrawer from './UserListDrawer';
import { CloseCircleOutlined } from '@ant-design/icons'

const { Meta } = Card;
const UserList = ({userList, delUser}) => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    return (
        <div>
            <Row>
            {userList.length!==0&&userList.map((user,i)=>{
                return(<Col span={24} key={`${i}${user.id}`}><Card style={{ width: 300 }}>
                    <p>id:{user.id}</p>
                    <p>score:{user.score}</p>
                    <CloseCircleOutlined onClick={()=>{delUser(user.id)}}/>
                    
                    
                
                  </Card></Col>)
            })}
                           
            <Col span={24}>
            <Card style={{ width: 300 }} onClick={()=>{showDrawer()}}>
    <p>add user</p>
    

  </Card>
            </Col>
            </Row>
            <UserListDrawer setOpen={setOpen} showDrawer={showDrawer} onClose={onClose} open={open}/>

        </div>
    );
};

export default UserList;