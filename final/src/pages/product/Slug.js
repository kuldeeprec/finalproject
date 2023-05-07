import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Slug = (props) => {
  
  // const router = useRouter();
  // const { slug } = router.query();
  const params = useParams();
  const [pin, setPin] = useState()
  const [plac, setPlac] = useState("")
  const [service, setService] = useState(false)
  const checkServiceability = async () => {
            if(!pin)
            {
              toast.error('Please! Enter Your Pin', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setService(false);
            }
            let pins = await fetch(`https://api.postalpincode.in/pincode/${pin}`)
            let pinJson = await pins.json()
            let location;
            console.log(pinJson, typeof(pinJson))
            Object.entries(pinJson).forEach(([key, value]) =>{
              location = value;
            })
            let loc;
            Object.entries(location).forEach(([key, value]) =>{
              if(key=="PostOffice")
              {
                   loc = value;
              }
            })
            let place;
            for(let i=0;i<loc.length;i++)
            {
              if(i==1)
              {
                  place = loc[i].Name;
              }
            }
            setPlac(place);
            console.log(plac)
            if(plac && pin){
              toast.success('Pin code is available!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setService(true)
            }
            else
            {
              toast.error('Pin code is not available!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
              setService(false)
            }
            console.log(service)
  }

 const onChangePin = (e) => {
  setPin(e.target.value)
 }

 const [color, setColor] = useState("")
 const [size, setSize] = useState("")
 const [product, setProduct] = useState({})
 const [variants, setVariants] = useState([])
    const fetchslug = async () => {
    const slg = params.userId;
    const tk = localStorage.getItem("lin");
    // console.log(tk, "12345")
    const response = await fetch(
      `http://localhost:5000/api/getproducts/getproduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({prod: tk})
      }
    );
    const json = await response.json();
    const products = json.products;
    let product = {}
    for(let item of products)
    {
          if(item.slug==slg)
          {
             product = item;
          }
    }
    console.log(products,"34")
    setProduct(product);
    setColor(product.color);
    setSize(product.size);
    const variants = []
    for(let item of products)
    {
          if(item.title==product.title)
          {
            variants.push(item)
          }
    }
    let colorSizeSlug = {}
    for(let item of variants)
    {
      if(Object.keys(colorSizeSlug).includes(item.color))
      {
        colorSizeSlug[item.color][item.size] = {slug: item.slug}
      }
      else
      {
        colorSizeSlug[item.color] = {}
        colorSizeSlug[item.color][item.size] = {slug: item.slug}
      }      
    }
    setVariants(variants);
    console.log(variants);
    if (json) 
    {
      console.log("slug fetch succesfully");
    } 
    else 
    {
      console.log("slug fetch Failed");
    }
  };
  useEffect(() => {
      fetchslug();
  },[]);
  const refreshVariants = (newSize, newColor) => {
    console.log(size);
    let p;
    for(let item in variants)
    {
      if(variants[item].size.includes(newSize) && variants[item].color.includes(newColor))
      {
         p = variants[item]['slug'];
      }
    }
    if(p)
    {
    let url = `http://localhost:3000/bat/${p}`
    window.location = url
    }
  }
  return (
    <>
     <section className="text-gray-600 body-font overflow-hidden">
     <ToastContainer />
  <div className="container px-5 py-16 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded shadow-lg" src={product.img} />
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p className="leading-relaxed">{product.desc}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
        <span className="mr-3">Color</span>
        {Object.keys(variants).map((items) =>(
          <div className="flex">
            {variants[items].color.includes('Red') && variants[items].size.includes(size) && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
            {variants[items].color.includes('blue') && variants[items].size.includes(size) && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
            {variants[items].color.includes('white') && variants[items].size.includes(size) && <button className="border-2 border-gray-300 ml-1 bg-white-500 rounded-full w-6 h-6 focus:outline-none"></button>} 
          </div>))}
          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
      
            <div className="relative">
              <select onChange={(e)=>{refreshVariants(e.target.value,color)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
              {Object.keys(variants).map((items) =>(
                <>
                {variants[items].size.includes('short') && <option>short</option>}
                {variants[items].size.includes('long') && <option>long</option>}
                </>))}
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">₹399.00</span>
          <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none
           hover:bg-indigo-600 rounded" onClick={()=>{props.addToCart(product.slug,1,product.size,product.title,product.size,product.color)}}>
            Add to Cart</button>
          <button onClick={()=>{props.buyNow(product.slug,1,product.size,product.title,product.size,product.color)}} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none
           hover:bg-indigo-600 rounded">Buy Now</button>
          <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center
           justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
        <div className="pin mt-6 flex space-x-2 text-sm">
          <input onChange={onChangePin} className="px-2 border-2 border-blue-300 rounded-md" placeholder="Enter your Pincode" type="text" />
          <button onClick={checkServiceability} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check</button>
        </div>
        {(!service && service!=null) && <div className="text-red-700 text-sm mt-3">
         Sorry! We do not deliver to this pincode
        </div>}
        {(service && service!=null)  && <div className="text-green-700 text-sm mt-3">
         Hurrah! We are Available to you <h3> {plac} </h3>
        </div>}
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Slug