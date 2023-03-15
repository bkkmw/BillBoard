import React, { useState } from 'react';
import { action } from '../../store/store';

const Test = () => {
    const [userId, setUserId] = useState('')
    const userIdHandler = (e) => {
        e.preventDefault()
        setUserId(e.target.value)
    }
    return (
        <div>
            <input type="text" value={userId} onChange={userIdHandler}/>
            <button onClick={()=>{
                action('user/setUserId', userId)
            }}></button>
        </div>
    );
};

export default Test;