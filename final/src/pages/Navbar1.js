import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const amount = useSelector(state => state.amount)
  return (
    <>
    <h1>page navbar</h1>
    <h1  className="mx-5">shopGY</h1>
     <button className="btn btn-primary mx-5" disabled="true">amount : {amount}</button>
     </>
  )
}

export default Navbar