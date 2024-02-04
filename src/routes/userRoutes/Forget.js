import axios from 'axios'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import {Form,Input,Button, Row, Col,Spin,message} from "antd"
import {MailOutlined} from '@ant-design/icons'
import {API} from "../../global"

export default function Register() {
    const navigate=useNavigate()
    const [loading,setloaing]=useState(false)
    
    const onFinish = async (values) => {
      try {
        setloaing(true);
        const response = await axios.post(`${API}/user/forget-password`, values);
    
        if (response.data.message === "useremail not found from db") {
          message.error("User email not found");
        } else {
          message.success("OTP sent successfully");
          navigate("/reset");
        }
      } catch (err) {
        message.error("OTP send failed");
        console.log("error in register", err);
      } finally {
        setloaing(false);
      }
    };
    

  return (
    <div className='backGround'>
      {loading ?
      <Spin size='large' className='spin'/>  :

        <Row justify={"center"} align={"middle"} style={{height:"100vh"}}>
        <Col xs={24} sm={24} md={12} lg={8} >
            <div className='form'>
            <h2 className='text-center bg-info'>Forget password</h2>
            <br/>
            <Form name='register' onFinish={onFinish}>

              <Form.Item name="email" 
              rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
              label="email" style={{ fontWeight: 'bold' }}>
                <Input  id='email' placeholder='Your email'  prefix={<MailOutlined />}/>
              </Form.Item>

              <Button type='primary' htmlType='submit' style={{width:"100%"}}>Send OTP</Button>

            </Form>
            </div>
          </Col>
      </Row>
        }  
    </div>
    )}