import React from 'react';
import user from '../../assets/profile.svg';
import style from './comment.module.css';
const Comment = () => {
  return (
    <div className={style.commentCard}>
        <div className={style.userInfo}>
              <img src={user} className='userProfile'/>
              <span className={style.userName}>Om Thorat</span>
        </div>
        <span className={style.date}>10 minutes ago</span>
        <span className={style.comment}>Come jknnewwncnenecncieniededwdsssssdweddessssswdewdedwd on</span>
    </div>
  );
}

export default Comment;
