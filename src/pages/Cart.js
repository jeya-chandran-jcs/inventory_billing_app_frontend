import React from 'react'
import {Button, Table,Modal,Form, Select, message, Spin} from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { PlusCircleOutlined,MinusCircleOutlined} from "@ant-design/icons"
import {useState,useEffect} from "react" 
import axios from 'axios'
import { API } from '../global'
import { useNavigate } from 'react-router-dom'
import { LeftOutlined, RightOutlined, BulbOutlined } from '@ant-design/icons';
import {  Layout } from 'antd';

import {  updateBill} from '../redux/itemSlice'

const { Header, Content } = Layout;

export default function Cart() {
    const dispatch=useDispatch()
    const [subTotal,setsubToal]=useState(0)
    const [billCharge,setbillCharge]=useState(false)
    const [quantity,setQuantity]=useState(1)
    
    const [Loading,setLoading]=useState(false)
    
    const navigate=useNavigate() 
    const [newItem,setNewItem]=useState([])
    const cartItems=useSelector(state=>state.itemShop.cartItems)
    
    console.log("cart items...",cartItems)

    useEffect(()=>{
        setNewItem(cartItems)
    },[cartItems])

  const increaseQuantity=(itemId)=>{
      setsubToal(subTotal + itemId.price )

    setQuantity(quantity+1)
    let a = structuredClone(newItem);
    let temp = []
    for (let x of a) {
        if (x._id === itemId._id) {
            temp.push ({ ...x, quantity: (x.quantity || 1) + 1 })
        }else{
            temp.push(x)
        }
    }

    setNewItem(temp)
  }
// const increaseQuantity = (record) => {
//     setsubToal(subTotal + record.price);
//     setQuantity(quantity + 1);

//         setNewItem((prevItems) =>
//         prevItems.map((item) =>
//             item._id === record._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
//         )
//     );
// };

// const decreaseQuantity = (record) => {
//     if (subTotal !== 0) {
//         if (quantity <= 1) {
//             return;
//         } else {
//             setsubToal(subTotal - record.price);
//             setQuantity(quantity - 1 );

//             setNewItem((prevItems) =>
//                 prevItems.map((item) =>
//                     item._id === record._id ? { ...item, quantity: (item.quantity || 1) -1  } : item
//                 )
//             );
            
        
//         }
//     }
// };
const decreaseQuantity = (record) => {
    if (subTotal !== 0) {
        if (quantity <= 1) {
            return;
        } else {
            setsubToal(subTotal - record.price);
            setQuantity(quantity - 1);

            // Update the quantity for the specific item
            setNewItem((prevItems) =>
                prevItems.map((item) =>
                    item._id === record._id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
                )
            );
        }
    }
};


  useEffect(()=>{
    let temp=0
    cartItems.forEach((item)=>{
        temp=temp+item.price*1
    })
    setsubToal(temp)
  },[cartItems])
  
  
  const handleFinish = (values) => {
    const reqObject = {
        ...values,
        subTotal,
        cartItems: cartItems.map((item) => ({
            _id: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        })),
        tax: Number((subTotal / 100) * 10),
        totalAmount: Number(subTotal + (subTotal / 100) * 10),
        // userId: JSON.parse(localStorage.getItem("user-data"))._id, use for offline pc only
    };
    console.log("reqObject",reqObject.userId)
    setLoading(true)
    axios.post(`${API}/bill/add-bill`,reqObject)
    .then((res)=>{
        
    console.log("add-bill res",res.data._id)
    message.success("bill created")
    dispatch(updateBill(newItem))
    navigate(`/bill?billId=${res.data._id}`)
    setLoading(false)
  })
  .catch((err)=>{
    setLoading(false)
    message.error("bill is not created")
})
  }
    

  const columns=[
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title:"image",
        dataIndex:"image",
        render:(image)=>(<img src={image} alt={cartItems.name} style={{width:"50px",height:"50px",objectFit:"contain"}}/>)
    },
    {
        title: "Price",
        dataIndex: "price"
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        // render:(item)=>(
        //     <div>
        //         <button onClick={()=>increaseQuantity(item._id)}>+</button>
        //         <span>{quantity}</span>
        //         <button onClick={()=>decreaseQuantity(item._id)}>-</button>
        //     </div>
        // )
        render:(id,record)=>(
            <div>
                <PlusCircleOutlined className="mx-3" onClick={()=>increaseQuantity(record)} />
                        {record.quantity || 1}
                <MinusCircleOutlined className="mx-3" onClick={()=>decreaseQuantity(record)} />
                
            </div>
        )
    }
]
    return (
    // 
    <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
            <Button type="dashed" icon={<LeftOutlined />} onClick={()=>navigate("/home")}/>
            <Button type="dashed" icon={<RightOutlined />} onClick={()=>navigate("/bill")} />
            <h1 style={{ margin: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>Cart</h1>
            </div>
          <div>
          <Button type="primary" icon={<BulbOutlined />} onClick={()=>navigate("/")}>
            LogOut
          </Button>
          </div>
        </Header>

        <Content>
            {Loading ? <Spin className="spinner-border" role="status" /> :
            <>
             <Table  dataSource={newItem} columns={columns} bordered pagination={false}/>
        
        <div className='d-flex justify-content-center flex-column'>
            <div>
                <h1>Sub Total: {subTotal}</h1>
            </div>
        </div>
       <Button type="primary" onClick={()=>setbillCharge(true)}>charge Bill</Button>

       <Modal title="Charge Bill" onCancel={()=>setbillCharge(false)} open={billCharge} footer={false}>
            <Form onFinish={handleFinish}>
                <Form.Item  name="customerName" label="Customer Name" 
                rules={[{ required: true, message: 'Please enter your name' }]}>
                    <input id="customerName" placeholder="customer name"/>
                </Form.Item>
                
                <Form.Item  name="customerPhone" label="Customer Ph no:" 
                rules={[{ required: true, message: 'Please enter your number' }]}>
                    <input id="customerPhone" placeholder="customer number" />
                </Form.Item>
                
                <Form.Item  name="paymentMode" label="Payment Type" 
                rules={[{ required: true, message: 'Please select payment type'}]}>
                    <Select>
                        <Select.Option value="Cash">Cash</Select.Option>
                        <Select.Option value="Card">Card</Select.Option>
                        <Select.Option value="UPI">UPI</Select.Option>
                    </Select>
                </Form.Item>
                <div>
                    <h3>Total Amount:{subTotal}</h3>
                    <h3>tax:<b>RS : {((subTotal/100)*10).toFixed(2)}</b></h3>
                    <h3>Total:<b>RS : {(subTotal+ (subTotal/100)*10).toFixed(2)}</b></h3>
                </div>
                <div className="d-flex justify-content-end">
                    <Button htmlType='submit' type="primary">Generate Bill</Button>
                </div>
            </Form>
       </Modal>    

            </>
            }
        </Content>
    </Layout>
      ) }

