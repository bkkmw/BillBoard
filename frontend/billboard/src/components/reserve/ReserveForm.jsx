import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import KakaoMapT from './KakaoMapT';

const ReserveForm = () => {
    const [location, setLocation] = useState({})
    useEffect(()=>{
        console.log(location)
    },[location])
    const modal = document.getElementById('modal')
    console.log(modal.getBoundingClientRect())
    return (
        <div>
            <Row>
                <Col span={12}>
                    <div style={{height:window.innerHeight*0.8}}>
                    <KakaoMapT setLocation={setLocation}/>
                    </div>
                    </Col>
                <Col span={12}>
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <div style={{color:"black"}}>장소:{location.place_name}</div></Col>
                </Row>
            
            
            
        </div>
    );
};

export default ReserveForm;