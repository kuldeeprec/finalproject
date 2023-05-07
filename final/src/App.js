import "./App.css";
import Navbar from "./pages/Navbar";
import ShopHome from "./pages/ShopHome";
import Footer from "./components/Footer";
import Bat from "./pages/Bat";
import Checkout from "./pages/Checkout";
import Ball from "./pages/Ball";
import Profile from "./pages/Profile";
import Kit from "./pages/Kit";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
// import Login from './pages/Login';
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import Index from "./pages/Index";
import Slug from "./pages/product/Slug";
import Home from "./players/home/Home";
import News from "./players/news/News";
import Friends from "./players/friends/Friends";
import Friendrequest from "./players/friendrequest/Friendrequest";
import MakeTeam from "./team/home/MakeTeam";
import VideoHome from "./video/pages/home/VideoHome";
import Recording from "./video/pages/recording/Recording";
import Chat from "./pages/Chat";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Myaccount from "./pages/Myaccount";

const App = () => {
  const [cart, setCart] = useState({});
  const [lin1, setLin1] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, []);
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = { itemCode: { qty: 1, price, name, size, variant } };
    setCart(newCart);
    saveCart(newCart);
    // console.log(newCart)
  };

  const clLink = (myLin) => {
    localStorage.removeItem("lin");
    localStorage.setItem("lin", myLin);
    setLin1(localStorage.getItem("lin"));
    // console.log(lin1, "Yes")
  };
  useEffect(() => {
    setLin1(localStorage.getItem("lin"));
  }, []);

  const sucReg = (temp) => {
    if (temp == 1) {
      toast.success("You are Register Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (temp == 2) {
      toast.success("Login Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (temp == 3) {
      toast.success("Logout Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <BrowserRouter>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        sucReg={sucReg}
      />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Index sucReg={sucReg} />}></Route>
        <Route path="/bat" element={<Bat clLink={clLink} />}></Route>
        <Route path="/ball" element={<Ball clLink={clLink} />}></Route>
        <Route path="/kit" element={<Kit clLink={clLink} />}></Route>
        <Route
          path={`/${lin1}/:userId`}
          element={
            <Slug
              buyNow={buyNow}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              subTotal={subTotal}
            />
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              subTotal={subTotal}
            />
          }
        ></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/myaccount" element={<Myaccount />}></Route>
        {/* <Route path="/login" element={<Login  sucReg={sucReg}/>}>
        
        </Route> */}
        <Route path="/signup" element={<Signup sucReg={sucReg} />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/friendrequest" element={<Friendrequest />}></Route>
        <Route path="/MakeTeam" element={<MakeTeam />}></Route>
        <Route path="/friends" element={<Friends />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/videohome" element={<VideoHome />}></Route>
        <Route path="/recording" element={<Recording />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route
          path="/shophome"
          element={
            <ShopHome
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              subTotal={subTotal}
            />
          }
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
