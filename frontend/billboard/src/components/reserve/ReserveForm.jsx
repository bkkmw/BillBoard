import React, { useEffect, useState } from 'react';

import { Col, Row } from 'antd';

import KakaoMapT from './KakaoMapT';
import ReserveFormInput from './ReserveFormInput';

const ReserveForm = () => {
    const [location, setLocation] = useState({})
    useEffect(()=>{
        console.log(location)
    },[location])
    const modal = document.getElementById('modal')
    return (
        <div>
            <Row>
                <Col span={12}>
                    <div style={{height:window.innerHeight*0.8}}>
                    <KakaoMapT setLocation={setLocation}/>
                    </div>
                    </Col>
                <Col span={12}>
                    <ReserveFormInput location={location.place_name}/>
                </Col>
                </Row>
            
            
            
        </div>
    );
};

export default ReserveForm;