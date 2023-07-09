import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';


const Register = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log(values)
    try {
      setLoading(true)
      await axios.post('/users/register', values)
      //127.0.0.1:8080
      //const response =
      // console.log(response)
      message.success('Registration Successfully')
      setLoading(false)
      navigate('/login') 
    } catch (error) {
      console.log(error)
      debugger
      setLoading(false)
      message.error('Something went Wrong!!')
    }


  }
  ///Protection
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  }, [navigate])




  return (
    <div className='bg_img'>
      <div className="register-page  login_card ">
        {/* {loading && <Spinner />} */}


        <Form
          layout='vertical' onFinish={handleSubmit}>
          <h1 className='white'>Register Form</h1>
          <Form.Item

            rules={[
              { required: true, message: 'Please enter your username!' },
              { min: 6, message: 'Username must be at least 6 characters!' },
              { max: 20, message: 'Username cannot exceed 20 characters!' },
            ]}

            label='Name' name='name'>
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item

            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Invalid email' },
            ]}

            label='Email' name='email'>
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: 'Please enter your password!' },
              { min: 5, message: 'Password must be at least 8 characters!' },
              { max: 15, message: 'Password cannot exceed 20 characters!' },
            ]}
            label='Password' name='password'>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <Link to='/login' className='white'>Already Register? click here to login</Link>
            <button className='btn btn-primary'>Register</button>
          </div>

        </Form>



      </div>
    </div>
  )
}

export default Register

