import React, { useState } from 'react';

import { Button } from 'antd';

import ReserveFindAddress from './ReserveFindAddress';
const ReserveFind = () => {
    const [address, setAddress] = useState('')
    const [isAddressOpen, setIsAddressOpen] = useState(false)
    const [isChildAddressOpen, setIsChildAddressOpen] = useState(false)
    return (
        <div>
            <Button type='primary' onClick={()=>{setIsAddressOpen(true)}}>{address===''?'지역별':address}</Button>
            <ReserveFindAddress Open={isAddressOpen} childrenDrawer={isChildAddressOpen} setAddress={setAddress} setChildrenDrawer={setIsChildAddressOpen} onClose={() => setIsAddressOpen(false)}/>
        </div>
    );
};

export default ReserveFind;