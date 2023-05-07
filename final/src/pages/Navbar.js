import React from 'react'
import { AiOutlineShoppingCart, AiOutlineCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { RiTeamLine } from 'react-icons/ri';
import { MdAccountCircle } from 'react-icons/md';
import { AiOutlineMessage } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = (props) => {

  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setEmail_id("");
    navigate("/");
    props.sucReg(3);
  }
  const [email_id, setEmail_id] = useState("");
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    let ml = localStorage.getItem("token");
    console.log(ml, "eml")
    if (ml)
      setEmail_id(ml);
    //  navigate("/");
  }, [])
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-start justify-between items-center py-1 shadow-xl sticky top-0 bg-white z-10">
        {localStorage.getItem('user_id') && <><div className="logo mx-5 my-1">
          <Link to="/home" className="nav-link"><img width={100} height={10} src="/home_logo.png" alt="" /></Link>
        </div>
          <div className="nav">
            <ul className="flex items-center space-x-4 font-bold md:text-xl my-3">
              <Link to="/home" className="nav-link hover:text-blue-700">
                <li><AiOutlineHome style={{ width: "40px", height: "40px", color: "black" }} /></li>
              </Link>
              <Link to="/maketeam" className="nav-link hover:text-blue-700">
                <li><RiTeamLine style={{ width: "40px", height: "40px", color: "black" }} /></li>
              </Link>
            </ul>
          </div>
          <div className="cart absolute flex right-0 mx-5 top-4 cursor-pointer">
            <Link to="/signup"><AiOutlineMessage className="mx-3" style={{ width: "40px", height: "40px", color: "black" }} /></Link>
            <a onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>{!dropdown && <MdAccountCircle className="text-xl md:text-4xl mx-2" style={{ width: "40px", height: "40px" }} />}
              {dropdown && <div style={{ width: "180px", height: "60px", color: "black" }} onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}
                className="absolute right-8 card pd-5 rounded-md px-5 w-80 nav-link text-bold rounded">
                <ul>
                  <li style={{ "fontWeight": "bold" }} onClick={logout} className="py-1 text-sm font-weight-bold"><div className="row"><div className="col"><FiLogOut /> </div><div className="col">Logout</div></div></li>
                </ul>
              </div>}
            </a>
          </div>
        </>}
      </div>
    </>
  )
}

export default Navbar