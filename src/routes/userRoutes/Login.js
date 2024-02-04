import axios from 'axios'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import {Form,Input,Button, Row, Col, message,Spin} from "antd"
import {LockOutlined,MailOutlined} from '@ant-design/icons'
import {API} from "../../global"

export default function Register() {
    const navigate=useNavigate()
    const [loading,setloaing]=useState(false)
    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&]).{8,}$/;

    const onFinish=async(values)=>{
      try{
        setloaing(true)
        const response=await axios.post(`${API}/user/login`,values)
        console.log("login response",response)
         message.success("login successfully")
          setloaing(false)
          navigate("/home")
      }catch(err){
        message.error("invalid email or password")
        setloaing(false)
        console.log("error in register",err)
      }
    }
  return (
    <div className='backGround'>
      {loading ? <Spin size='large' className='spin'/> :
      
      <Row justify={"center"} align={"middle"} style={{height:"100vh"}}>
      <Col xs={24} sm={24} md={12} lg={8} >
        <div className='form'>
          <h2 className='text-center bg-info'>Login</h2>
          <br/>
          <Form name='register' onFinish={onFinish}>

            <Form.Item name="email" 
            rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
            label="email" style={{ fontWeight: 'bold' }}>
              <Input  id='email' placeholder='Your email' prefix={<MailOutlined />}/>
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' },
            {pattern: passwordRegex, message: 'Password must be unique ex: JohnDoe@123' }]}
            label="password " style={{ fontWeight: 'bold' }}>
              <Input  id='password' placeholder='password' prefix={<LockOutlined />}/>
            </Form.Item>
            
            <div>
              <p className='float-start text-primary pointer'  onClick={()=>navigate("/register")}><b>Create Account</b> </p>
            <p className='float-end text-primary pointer' onClick={()=>navigate("/forget")} style={{ fontWeight: 'bold' }}>
            forget password</p>
            </div>

            <Button type='primary' htmlType='submit' style={{width:"100%"}}>Login</Button>

          </Form>
          </div>
        </Col>
    </Row>
      }
        
    </div>
    )}