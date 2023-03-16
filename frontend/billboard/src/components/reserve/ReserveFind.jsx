import { Button } from 'antd';
import React, { useState } from 'react';
import ReserveFindAddress from './ReserveFindAddress';
const ReserveFind = () => {
    const [address, setAddress] = useState('')
    const [isAddressOpen, setIsAddressOpen] = useState(false)
    const [isChildAddressOpen, setIsChildAddressOpen] = useState(false)
    return (
        <div>
            <Button type='primary' onClick={()=>{setIsAddressOpen(true)}}>{address===''?'지역별':address}</Button>
            <ReserveFindAddress Open={isAddressOpen} onClose={() => setIsAddressOpen(false)} setChildrenDrawer={setIsChildAddressOpen} childrenDrawer={isChildAddressOpen} setAddress={setAddress}/>
        </div>
    );
};

export default ReserveFind;