import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useRef } from 'react';

const ShopHome = (props) => {

    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }
    const ref = useRef();
//   }
    return (
        <div className="container">
            <div className="cart absolute flex right-0 mx-5 top-4 cursor-pointer">
                <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-4xl" style={{ height: "100px", width: "50px", marginLeft: "10px" }} />
            </div>
            <div style={{width: "300px"}} ref={ref} className="sideCart overflow-y-scroll w-72 h-[100vh] absolute top-4 right-0 p-10 bg-blue-100 shadow-xl transform transition-transform translate-x-full">
                <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
                <span onClick={toggleCart} className="absolute top-0 right-0 cursor-pointer text-2xl text-blue-500"><AiOutlineCloseCircle /></span>
                {Object.keys(props.cart).length === 0 && <div className="my-4">No Item in the Cart
                    Please add something for Checkout</div>}
                <ol>
                    {Object.keys(props.cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-2">
                                <div className="w-2/3 font-semibold p-2">1. {props.cart[k].name} - Good Choice</div>
                                <div className="flex item-center font-semibold justify-center w-1/3 my-2"><AiOutlineMinusCircle className="my-2 cursor-pointer" onClick={() => props.removeFromCart(k, 1, props.cart[k].price, props.cart[k].name, props.cart[k].size, props.cart[k].varient)} />
                                    <span className="mx-2 my-1">{props.cart[k].qty}</span><AiOutlinePlusCircle className="my-2 cursor-pointer" onClick={() => props.addToCart(k, 1, props.cart[k].price, props.cart[k].name, props.cart[k].size, props.cart[k].varient)} /></div>
                            </div>
                        </li>
                    })}
                </ol>
                <Link to="/checkout"><button class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"><BsFillBagCheckFill onClick={props.clearCart} className="mx-1 my-1" />Checkout</button></Link>
                <button class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Clear Cart</button>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <section className="text-gray-600 body-font">
                        <div className="mt-4 card text-center" style={{ backgroundColor: "rgba(0, 0, 255, 0.3)" }}>
                            <Link to="/bat" style={{ textDecoration: "none" }}><h2 className="text-gray-900 title-font text-lg font-medium" style={{ fontWeight: "bold", fontSize: "30px", textDecoration: "none" }}>Bat</h2></Link>
                        </div>
                        <div className="container py-24 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                <div>
                                    <div className="dropdown">
                                        <button className="dropbtn">Sort</button>
                                        <div className="dropdown-content">
                                            <a href="#">Child Bats</a>
                                            <a href="#">Adult Bats</a>
                                            <a href="#">Lether Bats</a>
                                        </div>
                                    </div>
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-cover object-center block" src="https://m.media-amazon.com/images/I/71ijgbTdf6L._SX569_.jpg" style={{ width: "550px", height: "350px" }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-md-4">
                    <section className="text-gray-600 body-font">
                        <div className="mt-4 card text-center" style={{ backgroundColor: "rgba(0, 0, 255, 0.3)" }}>
                            <Link to="/ball" style={{ textDecoration: "none" }}><h2 className="text-gray-900 title-font text-lg font-medium" style={{ fontWeight: "bold", fontSize: "30px" }}>Ball</h2></Link>
                        </div>
                        <div className="container py-24 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                <div>
                                    <div className="dropdown">
                                        <button className="dropbtn">Sort</button>
                                        <div className="dropdown-content">
                                            <a href="#">Child Balls</a>
                                            <a href="#">Adult Balls</a>
                                            <a href="#">Lether Balls</a>
                                        </div>
                                    </div>
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-cover object-center block" src="https://m.media-amazon.com/images/I/31vZmOVmf0L._SY300_SX300_QL70_FMwebp_.jpg" style={{ width: "550px", height: "350px" }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-md-4">
                    <section className="text-gray-600 body-font">
                        <div className="mt-4 card text-center" style={{ backgroundColor: "rgba(0, 0, 255, 0.3)" }}>
                            <Link to="/kit" style={{ textDecoration: "none" }}><h2 className="text-gray-900 title-font text-lg font-medium" style={{ fontWeight: "bold", fontSize: "30px" }}>Kit</h2></Link>
                        </div>
                        <div className="container py-24 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                <div>
                                    <div className="dropdown">
                                        <button className="dropbtn">Sort</button>
                                        <div className="dropdown-content">
                                            <a href="#">Adult Kits</a>
                                            <a href="#">Lether Kits</a>
                                        </div>
                                    </div>
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-cover object-center block" src="https://m.media-amazon.com/images/I/71O8-ltHVAL._SX522_.jpg" style={{ width: "550px", height: "350px" }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ShopHome

// <div className="mt-4 text-center">
// <h2 className="text-gray-900 title-font text-lg font-medium">Somnath Yadav</h2>
// <span className="justify-center items-center"><button type="button" className="btn btn-primary my-2" style={{ width: "100px" }}>Delete</button></span>
// <div className="mt-1">
// </div>
// <div className="mt-1">
// </div>
// </div>