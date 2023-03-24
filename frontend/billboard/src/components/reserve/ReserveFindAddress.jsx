
import React, { useState } from 'react';

import { Button, Drawer, List } from 'antd';

import ADDRESS from '../../config/address'
import "./ReserveFindAddress.css"
const ReserveFindAddress = ({Open, onClose, childrenDrawer, setChildrenDrawer,setAddress}) => {
    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
      };
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
      };
    const [addressfirst, setAddressFirst] = useState('수도권')
    const [addressNxt, setAddressNxt] = useState(Object.keys(ADDRESS[addressfirst])[0])
    const [showNxtDrawer, setShowNxtDrawer] = useState(false)
    return (

       <Drawer closable={false} open={Open} title="지역선택" width={520} onClose={onClose} placement={"bottom"}>
    <List

      dataSource={Object.keys(ADDRESS)}
      renderItem={(item) => (
        <List.Item className='list_item_hover' onClick={()=>{setAddressFirst(item)
        showChildrenDrawer()
        }}>
          {item}
        </List.Item>
      )}
    />
       <Drawer
         closable={false}
         open={childrenDrawer}
         title={addressfirst}
         width={320}
         onClose={onChildrenDrawerClose}
         placement={"bottom"}

       >
        <List
        dataSource={Object.keys(ADDRESS[addressfirst])}
        renderItem={(item) => (
            <List.Item className='list_item_hover' onClick={()=>{
                setAddressNxt(item)
                setShowNxtDrawer(true)}}>
                {item}
            </List.Item>
            )}
        />
        <Drawer
                 closable={false}
                 open={showNxtDrawer}
                 title={addressNxt}
                 width={320}
                 onClose={()=>{setShowNxtDrawer(false)}}
                 placement={"bottom"}
               >
                <List
        dataSource={ADDRESS[addressfirst][addressNxt]}
        renderItem={(item) => (
            <List.Item className='list_item_hover' onClick={()=>{
                // Todo: 지역별 방목록 조회기능 추가
                setShowNxtDrawer(false)
                onChildrenDrawerClose()
                onClose()
                setAddress(`${addressfirst}/${addressNxt}/${item}`)
                }}>
                {item}
            </List.Item>
            )}
        />

               </Drawer>
       </Drawer>
     </Drawer>
    );
};

export default ReserveFindAddress;