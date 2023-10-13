import React from 'react';
import { UserPhotoImg } from './style';

function UserPhoto(props) {
  return <UserPhotoImg src={props.src} />;
}

export default UserPhoto;
