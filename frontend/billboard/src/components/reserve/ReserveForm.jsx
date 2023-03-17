import React, { useEffect } from 'react';
const {kakao} = window;
const ReserveForm = () => {
  useEffect(() => {
    const container = document.getElementById('map')
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
  },[])

  return (
    <div id="map" style={{
      width: '500px',
      height: '500px'
    }}>
      
    </div>
  );
};

export default ReserveForm;

// import { useEffect, useRef } from "react";


// const { kakao } = window;

// const ReserveForm = () => {
//   const container = useRef(null);
//   const options = {
//     center: new kakao.maps.LatLng(37.56637787425258, 126.97827585270615),
//     level: 5,
//   };
//   useEffect(() => {
//     const map = new kakao.maps.Map(container.current, options);
//     const location = [
//       [37.56637787425258, 126.97827585270615],
//       [37.56606939560325, 126.9826002893739],
//       [37.56581495896049, 126.9752617019476],
//     ];
//     location.map((e) => {
//       const markerPosition = new kakao.maps.LatLng(e[0], e[1]);
//       new kakao.maps.Marker({ map, position: markerPosition });
//     });
//   }, []);
//   return (
//     <div className="container">
//       <div id={"map"} ref={container}></div>
//     </div>
//   );
// };

// export default ReserveForm;