import React from 'react';

import { Link } from 'react-router-dom';

import Test from '../tst/test';

const Main = () => {

  return (
    <div>
      Main.jsx에서 작성된 내용
      <Link to={'profile'}>프로필페이지</Link>
      {/* <Test>테스트</Test> */}

    </div>
  );
};

export default Main;