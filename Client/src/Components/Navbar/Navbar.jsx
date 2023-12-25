import { Avatar, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { currentUserSelector, logOut, tokenSelector } from '../../Redux/authenticationSlice';
import style from './navbar.module.css';
const Navbar = () => {
  const token = useSelector(tokenSelector)
  const currentUser = useSelector(currentUserSelector)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  const handleClick = ()=>{
    dispatch(logOut())
    navigate('/login')
  }
  
  
  return (
    <div className="container" style={{height:'10%',width:"100 %"}}>
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="col-md-2 mb-2 mb-md-0">
        <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
          TaskMaster Hub
        </Link>
      </div>
      <div className="col-md text-start mx-0 ">
        <Link type="button" to='/' className="btn btn-primary ">Home</Link>
      </div>

      {token?<div className="col-md text-end mx-0 d-flex justify-content-end align-items-center  ">
        <button type="button" to='/' className="btn btn-primary" onClick={handleClick}>Logout</button>
        <div className={style.avtar}>
        <Wrap>
  <WrapItem>
    <Avatar name='Dan Abrahmov' size='sm' src={currentUser.photoUrl} />
  </WrapItem>
  </Wrap>
        </div>
      </div>:<div></div>}
    </header>
  </div>
  );
}

export default Navbar;
