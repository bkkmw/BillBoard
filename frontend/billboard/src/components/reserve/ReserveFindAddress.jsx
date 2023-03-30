
import React, { useEffect, useState } from 'react';

import { Button, Drawer, List } from 'antd';

import ADDRESS from '../../config/address'
import "./ReserveFindAddress.css"
import { getdong, getdongCode, getgugun, getSido } from '../../store/location';
import { useDispatch } from 'react-redux';
const ReserveFindAddress = ({ Open, onClose, childrenDrawer, setChildrenDrawer, setAddress, setCoordinate }) => {
  const [sido, setSido] = useState()
  const [gugun, setGugun] = useState()
  const [dong, setDong] = useState()
  const [myLocal, setMyLocal] = useState({ sido: '', gugun: '', dong: '' })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSido()).then((res) => {
      setSido(res.payload.sidoList)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  useEffect(() => {
    if (myLocal.sido) {
      dispatch(getgugun(myLocal.sido.sidoCode)).then((res) => {
        setGugun(res.payload.gugunList)
        showChildrenDrawer()
      })
    }
  }, [myLocal.sido])
  useEffect(() => {
    if (myLocal.gugun) {
      console.log('동불러오기')
      dispatch(getdong(myLocal.gugun.gugunCode)).then((res) => {
        setDong(res.payload.dongList)
        setShowNxtDrawer(true)
      })
    }
  }, [myLocal.gugun])
  useEffect(() => {
    if (myLocal.dong) {
      dispatch(getdongCode(myLocal.dong.dongCode)).then((res) => {
        console.log(res)
        setCoordinate({ y: res.payload.coordinate.lat, x: res.payload.coordinate.lng })
      })
    }
  }, [myLocal.dong])
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

    <Drawer closable={false} open={Open} title="지역선택" width={520} onClose={onClose} placement={"left"}>
      <List

        dataSource={sido}
        renderItem={(item) => (
          <List.Item className='list_item_hover' onClick={() => {
            setMyLocal({ ...myLocal, sido: item })

          }}>
            {item.sidoName}
          </List.Item>
        )}
      />
      <Drawer
        closable={false}
        open={childrenDrawer}
        title={myLocal.sido.sidoName}
        width={320}
        onClose={onChildrenDrawerClose}
        placement={"left"}

      >
        <List
          dataSource={gugun}
          renderItem={(item) => (
            <List.Item className='list_item_hover' onClick={() => {
              setMyLocal({ ...myLocal, gugun: item })

            }}>
              {item.gugunName}
            </List.Item>
          )}
        />
        <Drawer
          closable={false}
          open={showNxtDrawer}
          title={myLocal.gugun.gugunName}
          width={320}
          onClose={() => { setShowNxtDrawer(false) }}
          placement={"left"}
        >
          <List
            dataSource={dong}
            renderItem={(item) => (
              <List.Item className='list_item_hover' onClick={() => {
                // Todo: 지역별 방목록 조회기능 추가
                setShowNxtDrawer(false)
                onChildrenDrawerClose()
                onClose()
                setMyLocal({ ...myLocal, dong: item })
                setAddress(`${myLocal.sido.sidoName}/${myLocal.gugun.gugunName}/${item.dongName}`)
              }}>
                {item.dongName}
              </List.Item>
            )}
          />

        </Drawer>
      </Drawer>
    </Drawer>
  );
};

export default ReserveFindAddress;