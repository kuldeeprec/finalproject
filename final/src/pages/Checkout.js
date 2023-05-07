import React from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { useState } from 'react';

const Checkout = (props) => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')

  const onChange = (e) => {
    if(e.target.name=='name') {
      console.log(e.target.value)
      setName(e.target.value);
    }
    else if(e.target.name=='email') {
      console.log(e.target.value)
      setEmail(e.target.value);
    }
    else if(e.target.name=='phone') {
      console.log(e.target.value)
      setPhone(e.target.value);
    }
    else if(e.target.name=='address') {
      console.log(e.target.value)
      setAddress(e.target.value);
    }
    else if(e.target.name=='pincode') {
      console.log(e.target.value)
      setPincode(e.target.value);
    }
  }

  const initiatePayment = async (e) => {
    e.preventDefault();
    console.log("initiate payment");
    let response = await fetch(`http://localhost:5000/api/auth/pretransaction` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "name": name, "email": email, "phone": phone, "address": address, "pincode": pincode }),
    })
    console.log(response);
  }

  return (
    <>
      <div className="container m-auto">
      <div className="application">
            <Helmet>
              <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
              <script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_HOST}.js`} crossorigin="anonymous"></script>
            </Helmet>
            </div>
        <h3 className="font-bold text-center my-4">1.Checkout</h3>
        <h2 className="font-bold text-xl">1. Delivery Details</h2>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={onChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={onChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
        </div>
        <div className="px-2 w-full">
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-600"
                >
                 Adrress
                </label>
                <textarea
                  type="text"
                  id="address"
                  name="address"
                  onChange={onChange}
                  row="10"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>


            <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                Phone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                onChange={onChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
        </div>

        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label
                  htmlFor="Pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  PinCode
                </label>
                <input
                  type="Number"
                  id="Pincode"
                  name="Pincode"
                  onChange={onChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
        </div>

        <h3 className="font-bold text-center my-4">2. Review Cart Item & Pay</h3>
        <div className="sideCart w-72 h-[100vh] p-10 bg-blue-100 shadow-xl">
       <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
       {Object.keys(props.cart).length===0 && <div className="my-4">No Item in the Cart 
       Please add something for Checkout</div>}
          <ol>
          {Object.keys(props.cart).map((k)=>{return <li key={k}>
          <div className="item flex my-2">
          <div className="font-semibold p-2">1. {props.cart[k].name} - Good Choice</div>
          <div className="flex item-center font-semibold justify-center w-1/3 my-2"><AiOutlineMinusCircle className="my-2 cursor-pointer" onClick={()=>props.removeFromCart(k,1,props.cart[k].price,props.cart[k].name, props.cart[k].size,props.cart[k].varient)}/>
           <span className="mx-2 my-1">{props.cart[k].qty}</span><AiOutlinePlusCircle className="my-2 cursor-pointer" onClick={()=>props.addToCart(k,1,props.cart[k].price,props.cart[k].name, props.cart[k].size,props.cart[k].varient)} /></div>
          </div>
          </li>})}
          </ol>
          <span className="font-bold">SubTototal:₹ {props.subTotal}</span>
       </div>
       <div className="mx-8">
       <Link to="/checkout"><button disabled={true} className="disabled:bg-blue-100 flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"><BsFillBagCheckFill  onClick={initiatePayment} className="mx-2 my-1" />Pay ₹</button></Link>
       </div>
      </div>
    </>
  );
};

export default Checkout;
