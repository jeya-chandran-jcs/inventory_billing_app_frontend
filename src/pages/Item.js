import { Card, Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/itemSlice'
const {Meta} = Card

export default function Item({item,index}) {
    const [Loading,setLoading]=useState(false)

    const dispatch=useDispatch()

    const handleCart=(item)=>{
      setLoading(true)
      console.log("add to cart")
      dispatch(addToCart(item))
      setLoading(false)
    }
    
    return (
    <div key={index}>
      {Loading ?  <Spin className="spinner-border" role="status" />  :
      
        <Card  style={{width: 250,marginTop:"10px"}} hoverable cover={<img style={{height:"250px",width:"100%",objectFit:"contain"}} src={item.image} alt={item.name}/>}>
            
            <Meta title={item.name} description={item.description}/>
            <h4>Price: {item.price}</h4>
            <button className='btn btn-primary' onClick={()=>handleCart(item)}>Add to Cart</button>
        </Card>

      
      }
                
    </div>
  )
}
