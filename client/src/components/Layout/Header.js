import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

import {message} from 'antd';
const Header = () => {
  const [loginUser, setLoginUser] = useState('');

  const navigate= useNavigate();
 useEffect(() => {
   const user= JSON.parse(localStorage.getItem('user'));
   if(user){
    setLoginUser(user)
   }
 }, []) 

 const  LogoutHandler=()=> {
  localStorage.removeItem("user");
  message.success('logout successfully');
  navigate('/login');
 }
   return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <div className='Brand'>
    <Link path='/' className="navbar-brand">
      <img src="logo-1.png" style={{width:'80px',height:'80px'}}  alt="" srcset="" />
      <span className='text-white '>Expense Manager</span>
      </Link>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">




        <li className="nav-item ">
          <Link path='/user'  className="nav-link  text-white fs-5" >
             <UserOutlined className='text-danger'/>
             {loginUser && loginUser.name}</Link>
        </li>


        <li className="nav-item">
          <button   className=" btn btn-danger" onClick={LogoutHandler} >LOGOUT</button>
        </li>

      </ul>

    </div>
  </div>
</nav>
    </>
  )
}

export default Header
