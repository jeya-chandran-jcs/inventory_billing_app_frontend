import axios from 'axios'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import {Form,Input,Button, Row, Col,Spin,message} from "antd"
import {API} from "../../global"
import {LockOutlined,MailOutlined} from '@ant-design/icons'

export default function Register() {
    const navigate=useNavigate()
    const [loading,setloaing]=useState(false)
    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&]).{8,}$/;

    
    // const onFinish=(values)=>{
    //   try{
    //     setloaing(true)
    //     axios.post(`${API}/user/reset-password`,values)
    //     .then((res)=>{
    //       message.success("password reset successfully")
    //       navigate("/login")
    //       setloaing(false)
    //     })
    //   }catch(err){
    //     message.error("password reset failed")
    //     setloaing(false)
    //     console.log("error in register",err)
    //   }
    // }
    const onFinish = (values) => {
      setloaing(true);
      axios
        .post(`${API}/user/reset-password`, values)
        .then((res) => {
          message.success("password reset success");
          navigate("/");
        })
        .catch((err) => {
          message.error("password reset failed!! please check your email, otp and password");
          console.log("error in reset password", err);
        })
        .finally(() => {
          setloaing(false);
        });
    };
  return (
    <div className='backGround'>
      {loading ?
       <Spin size='large' className='spin'/> :

        <Row justify={"center"} align={"middle"} style={{height:"100vh"}}>
        <Col xs={24} sm={24} md={12} lg={8} >
           <div className='form'>
            <h2 className='text-center bg-info'>Reset password </h2>
            <br/>

            <Form name='register' onFinish={onFinish}>

              <Form.Item name="email" 
              rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
              label="email" style={{ fontWeight: 'bold' }}>
                <Input  id='email' placeholder='Your email'  prefix={<MailOutlined />} 
                style={{marginLeft:"1.5%"}}/>
              </Form.Item>

              <Form.Item name="otp" 
              rules={[{ required: true, message: 'Please enter your otp', type: 'otp' }]}
              label="otp" style={{ fontWeight: 'bold' }}>
                <Input  id='otp' placeholder='Your otp' style={{marginLeft:"1vw"}}/>
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' },
              {pattern: passwordRegex, message: 'Password must be unique ex: JohnDoe@123' }]}
              label="New password " style={{ fontWeight: 'bold' }}>
                <Input  id='password' placeholder='password' prefix={<LockOutlined />}/>
              </Form.Item>

              <Button type='primary' htmlType='submit' style={{width:"100%"}}>reset password</Button>

            </Form>
            </div>
          </Col>
      </Row>
        }  
    </div>
    )}