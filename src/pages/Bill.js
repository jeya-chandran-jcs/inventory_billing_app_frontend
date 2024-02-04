import React, { useEffect,  useState } from 'react'
import { API } from '../global'
import { Button, Spin, message } from 'antd'
import axios from 'axios'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LeftOutlined, BulbOutlined } from '@ant-design/icons';
import {  Layout } from 'antd';

const { Header, Content } = Layout;

export default function Bill() {
    const [billData,setbillData]=useState([])
    let [pramas]=useSearchParams()
    const componentRef=React.useRef(null)
    const [Loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const cartQuantity=useSelector(state=>state.itemShop.cartItems)
    
    console.log("cartQauntity",cartQuantity)
    
    const getAllBills=()=>{
        const billId = pramas.get("billId")
        if (!billId) {
            // Handle the case where billId is not provided
            message.error("BillId is not provided");
            return;
          }
          
          setLoading(true)
        axios.get(`${API}/bill/get-one-bill?billId=${billId}`)
        .then((res)=>{

            setbillData([res.data])
            console.log(" bill data console",res.data)
          
            setLoading(false)
        })
        .catch((err)=>{
          
            setLoading(false)
            message.error("something went wrong in get  bills")
        })
    }
    
    useEffect(()=>{
        getAllBills()
    },[])

    const handlePrint=useReactToPrint({
        content:()=>componentRef.current
    })

    const reactToPrintContent=React.useCallback(()=>{
        return componentRef.current
    },[componentRef.current])

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
            <Button type="text" icon={<LeftOutlined />} onClick={()=>navigate("/home")}>
              Home
              </Button>
              <h1 style={{ margin: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                Billing</h1>
            </div>
          <div>
          <Button type="primary"  style={{marginRight:"10px"}} onClick={handlePrint}>
            Print
          </Button>
          <Button type="primary" icon={<BulbOutlined />} onClick={()=>navigate("/")}>
            LogOut
          </Button>
          </div>
        </Header>

        <Content>

        
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card bill-details-container" ref={componentRef}>
        <div className="card-header text-center">
          <h1>Bill Details</h1>
        </div>

       {Loading ? <Spin size='large' className='spin' /> :  
        <div className="card-body">
        {billData.map((item) => (
          <div className="bill-card" key={item._id}>
            <div className="customer-details">
              <h4>Customer Name: <span>{item.customerName}</span></h4>
              <h4>Customer Phone: <span>{item.customerPhone}</span></h4>
            </div>

            <div className="items-list table-responsive">
              <table className="table items-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Item quantity</th>
                  </tr>
                </thead>
          
              <tbody>
                {cartQuantity.map((cartItem) => (
                  <tr key={cartItem._id}>
                    <td>{cartItem.name}</td>
                    <td>{cartItem.price}</td>
                    <td>{cartItem.quantity || 1}</td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>

            <div className="bill-summary">
              <h4>Sub Total: <span>{item.subTotal}</span></h4>
              <h4>Tax: <span>{item.tax}</span></h4>
              <h4>Total: <span>{item.totalAmount}</span></h4>
            </div>

            <div className="payment-details">
              <h4>Payment Mode: <span>{item.paymentMode}</span></h4>
            </div>
          </div>
        ))}
      </div>
       }

        <div className="card-footer text-center">
          <p>Inventory Billing App</p>
        </div>
      </div>        <ReactToPrint
            content={reactToPrintContent}
            documentTitle="AwesomeFileName"
            removeAfterPrint
            />
        </div> 
        
        </Content>
    </Layout>
  )
}
