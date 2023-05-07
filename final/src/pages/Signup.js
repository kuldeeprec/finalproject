import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Country, State, City } from 'country-state-city'
import 'react-toastify/dist/ReactToastify.css';

const Signup = (props) => {
  const [pin, setPin] = useState()
  const [playPlace, setPlayPlace] = useState([]);
  const [city, setCity] = useState([])
  const [service, setService] = useState(false);
  const checkArea = async () => {
    let pins = await fetch(`https://api.postalpincode.in/pincode/${pin}`)
    let pinJson = await pins.json()
    let location
    Object.entries(pinJson).forEach(([key, value]) => {
      location = value;
    })
    let loc;
    Object.entries(location).forEach(([key, value]) => {
      if (key === "PostOffice") {
        loc = value;
      }
    })
    let place = [];
    for (let i = 0; i < loc.length; i++) {
      place.push(loc[i].Name)
    }
    setPlayPlace(place);
    setService(true)
  }


  const onChangePin = (e) => {
    setPin(e.target.value)
  }
  const [credentials, setCredentials] = useState({ name: "", signupEmail: "", district: "", place: "", password: "", confirmpassword: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, signupEmail, district, place, password, confirmpassword } = credentials;
    console.log(name, signupEmail, pin, district, place, "place");
    let pincode = pin;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, signupEmail, district, pincode, place, password, confirmpassword })
    });
    const json = await response.json()
    // console.log(json,"No");
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      console.log(json, "No");
      navigate("/");
      props.sucReg(1);
    }
    else {
      // alert("Invalid credential");
      toast.error('You are not registered yet!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  const onChange = (e) => {
    // setCredentials({name:"e.target.name" , district:"e.target.email", place:"e.target.district", nearground:"e.target.nearground", distance:"e.target.distance" ,password:"e.target.password",confirmpassword:"e.target.confirmpassword"})
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    let p2 = [];
    const cities = City.getAllCities()
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].stateCode == "UP") {
        console.log(cities[i].stateCode, "cities[i].stateCode");
        p2.push(cities[i].name);
      }
    }
    setCity(p2);
  }, [])
  return (
    <>
      <ToastContainer />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-35 w-auto" src="/home_logo.png" alt="Your Company" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500 mx-3">Sign in</a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={onChange} id="name" name="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="signupEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={onChange} id="signupEmail" name="signupEmail" />
              </div>
              <div className="mb-3">
                <select className="form-select my-3" id="district" name="district" onChange={onChange} aria-label="Default select example">
                  <option selected>Choose Your City</option>
                  {city.map(place3 => <option key={place3} value={place3}>{place3}</option>)}
                </select>
                {/* <label htmlFor="district" className="form-label">District</label>
                <input type="text" className="form-control" id="district" onChange={onChange} name="district" /> */}
              </div>

              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">Pincode</label>
                <input type="text" className="form-control" id="pincode" onChange={onChangePin} name="pincode" />
              </div>
              <small id="location" className="form-text text-muted">Enter pincode and enter submit to get location.</small>
              <p style={{ cursor: "pointer" }} onClick={checkArea} className="w-30 text-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700">
                Submit
              </p>
              <select className="form-select my-3" name="place" onChange={onChange} aria-label="Default select example">
                <option selected>Choose Your Ground</option>
                {playPlace.map(place => <option key={place} value={place}>{place}</option>)}
              </select>
              {/* <div className="mb-3 my-1">
                <label htmlFor="place" className="form-label">Place</label>
                <input type="text" className="form-control" id="place" onChange={onChange} name="place" />
              </div> */}
              {/* <div className="mb-3">
                <label htmlFor="distance" className="form-label">Distance</label>
                <input type="number" className="form-control" id="distance" onChange={onChange} name="distance" />
              </div> */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={onChange} name="password" />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmpassword" onChange={onChange} name="confirmpassword" />
              </div>
            </div>
            <div>
              <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                  </svg>
                </span>
                Sign UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup