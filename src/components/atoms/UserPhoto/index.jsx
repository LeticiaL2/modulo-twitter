import React from 'react'
import { UserPhotoImg } from './style'

const UserPhoto = (props) => {
  return (
    <UserPhotoImg src={props.src}/>
  )
}

export default UserPhoto