import React from 'react';
import wating from '../../assets/gameroom/wating.json'
import { useLottie } from 'lottie-react';
const Wating = () => {
    const options = {
        animationData: wating,
        loop: true,
        autoplay: true,
    };

    const style = {
        height: 300,
    };
    const { View } = useLottie(options, style);

    return View

};

export default Wating;