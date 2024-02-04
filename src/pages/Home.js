import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { API } from '../global'
import Item from './Item'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartOutlined, RightOutlined, BulbOutlined } from '@ant-design/icons';
import { Button, Layout, Badge, Spin } from 'antd';



const { Header, Content } = Layout;
export default function Home() {
  const [itemData,setitemData]=useState([]) 
  const [Loading,setLoading]=useState(false) 
  
  const cartItems=useSelector(state=>state.itemShop.cartItems)
 
  const navigate=useNavigate()
 
  useEffect(()=>{
    setLoading(true)
    axios.get(`${API}/product/get-item`)
      .then(res=>{
        setitemData(res.data)
        setLoading(false)
      })
      .catch(err=>{
        setLoading(false)
        console.log("error in getting",err)
      })
    },[])

  useEffect(()=>{
   localStorage.setItem("cartItems",JSON.stringify(cartItems))
  },[cartItems])

   const goToCartPage = () => {
    navigate('/cart');
  };

  return (
  <Layout>
  <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
    <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
        <Button type="dashed" icon={<RightOutlined />} onClick={()=>navigate("/cart")} />
        <h1 style={{ margin: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%',marginLeft:"5rem" }}>Inventory</h1>
    </div>
    <div>
      <Button type="text" icon={<ShoppingCartOutlined />} onClick={goToCartPage}>
        <Badge count={cartItems.length} overflowCount={9} onClick={goToCartPage}>
          Cart
        </Badge>
      </Button>
      <Button type="primary" icon={<BulbOutlined />} onClick={()=>navigate("/")}>
        LogOut
      </Button>
    </div>
  </Header>
  <Content style={{ padding: '20px' }}>
   {Loading?
    <Spin className="spinner-border" role="status"  />:
      <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        alignItems: 'flex-start',
        marginTop: '20px',
      }}
    >
      {itemData.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </div>
   }
      <div className='d-flex justify-content-center align-items-center m-3'>
        <Button type="dashed"  onClick={goToCartPage} >Checkout</Button>
      </div>
  </Content>
</Layout>

  )
}
