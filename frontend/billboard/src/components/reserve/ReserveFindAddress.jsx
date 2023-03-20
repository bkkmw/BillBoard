
import { Button, Drawer, List } from 'antd';
import React, { useState } from 'react';
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

       <Drawer title="지역선택" width={520} closable={false} onClose={onClose} open={Open}>
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
         title={addressfirst}
         width={320}
         closable={false}
         onClose={onChildrenDrawerClose}
         open={childrenDrawer}

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
                 title={addressNxt}
                 width={320}
                 closable={false}
                 onClose={()=>{setShowNxtDrawer(false)}}
                 open={showNxtDrawer}
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