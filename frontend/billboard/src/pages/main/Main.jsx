import React from 'react';
import { Link } from 'react-router-dom';
const Main = () => {
  return (
    <div>
      Main.jsx에서 작성된 내용
      <Link to={'profile'}>프로필페이지</Link>
    </div>
  );
};

export default Main;