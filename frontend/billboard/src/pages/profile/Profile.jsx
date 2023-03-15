import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../main/Main';
const Profile = () => {
  return (
    <div>
      Projile.jsx에서 작성한 내용
      <Link to='/'>메인페이지로</Link>
    </div>
  );
};

export default Profile;