import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../main/Main';
import { selectUser } from '../../store/user';
import { useSelector } from 'react-redux';
const Profile = () => {
  const userId = useSelector(selectUser).loginUser.userId
  return (
    <div>
      Projile.jsx에서 작성한 내용
      <Link to='/'>메인페이지로</Link>
      <div>유저이름:{userId}</div>
    </div>
  );
};

export default Profile;