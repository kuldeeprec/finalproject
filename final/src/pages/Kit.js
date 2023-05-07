import { React, useEffect, useState } from "react";
import {Link} from "react-router-dom";

const Kit = (props) => {

  const [products, setProducts] = useState({})
    const fetchkit = async () => {
    const response = await fetch(
      `http://localhost:5000/api/getproducts/getproduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({prod: "kit"})
      }
    );
    const json = await response.json();
    const products = json.products;
    let kits = {}
       for(let item of products)
       {
              if(item.title in kits)
              {
                     if(!kits[item.title].color.includes(item.color) &&  item.availableQty>0)
                     {
                            kits[item.title].color.push(item.color)
                     }
                     if(!kits[item.title].size.includes(item.size) &&  item.availableQty>0)
                     {
                            kits[item.title].size.push(item.size)
                     }
              }
              else
              {
                     kits[item.title] = JSON.parse(JSON.stringify(item))
                     if(item.availableQty>0)
                     {
                            kits[item.title].color = [item.color]
                            kits[item.title].size = [item.size]
                     }
              }
       }
    setProducts(kits);
    if (json) 
    {
      console.log("thread fetch succesfully");
    } 
    else 
    {
      console.log("thread fetch Failed");
    }
  };
  useEffect(() => {
      fetchkit();
  },[]);
  return (
    <>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
      {Object.keys(products).map((items) =>(
       <Link key={products[items]._id} to={`/kit/${products[items].slug}`} onClick={props.clLink("kit")} className="nav-link lg:w-1/5 md:w-1/2 p-4 w-full  shadow-lg m-3">
        <div>
        <a className="block relative rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={products[items].img} />
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[items].catagory}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{products[items].title}</h2>
          <p className="mt-1">₹{products[items].price}</p>
          <div className="mt-1">
            {products[items].size.includes('short') && <span className="border border-gray-300 px-1 mx-1">S</span>}
            {products[items].size.includes('long') && <span className="border border-gray-300 px-1 mx-1">L</span>}
          </div>
          <div className="mt-1">
          {products[items].color.includes('Red') && <button className="border-2 border-red-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[items].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          </div>
        </div>
      </div></Link>))}
    </div>
  </div>
</section>
    </>
  )
}

export default Kit
