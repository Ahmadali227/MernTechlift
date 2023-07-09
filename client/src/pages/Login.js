import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { MailOutlined, LockOutlined } from '@ant-design/icons';


const Login = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      const { data } = await axios.post('/users/login', values)
      setLoading(false)
      message.success('login Successfully')
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }))
      navigate('/')
    } catch (error) {
      setLoading(false)
      message.error('Something went Wrong')
    }

  }
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className='login_img'>
      <div className="register-page login_card">
        {/* {loading && <Spinner />} */}

        <Form layout='vertical' onFinish={handleSubmit}>
          <h1 className='white text-center'>Login Form</h1>


          <Form.Item
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Invalid email' },
            ]}
            label='Email' name='email'>
            <Input prefix={<MailOutlined />}  autoComplete='on'/>
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: 'Password is required' },
            ]}
            label='Password' name='password'>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <div className="d-flex justify-content-center align-items-center gap-3">
            <Link to='/register'>New user??Click here to Register</Link>
            <button className='btn btn-primary '>Login</button>
          </div>

        </Form>



      </div>
    </div>
  )
}

export default Login


