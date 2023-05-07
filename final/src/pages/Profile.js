import { React, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { City } from 'country-state-city'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const FormData = require("form-data");

const Profile = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [user, setUser] = useState({});
    const [img1, setImg1] = useState("");
    const [myimage, setMyimage] = useState({ profileImage: '', email: '' });
    const [mypost, setMypost] = useState({ postImage: '', email: '' });

    const [pin, setPin] = useState()
    const [playPlace, setPlayPlace] = useState([]);
    const [city, setCity] = useState([])
    const [service, setService] = useState(false);
    const [credentials, setCredentials] = useState({ district: "", place: "" })
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let p2 = localStorage.getItem('user_id');
        const { district, place } = credentials;
        console.log(district, place, "place");
        let pincode = pin;
        const response = await fetch(`http://localhost:5000/api/auth/changelocation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ district, pincode, place, p2 })
        });
        const json = await response.json()
        // console.log(json,"No");
        if (json.success) {
            toast.success('Updated Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // save the auth token and redirect
            // navigate("/");
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

    const onChangePin = (e) => {
        setPin(e.target.value)
    }

    const fetch_user = async () => {
        let p2 = localStorage.getItem('user_id');
        console.log(p2)
        const response = await fetch(
            `http://localhost:5000/api/auth/finduser`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: p2 })
            }
        );
        const json = await response.json();
        setUser(json.user);
        setImg1(json.img1);
        console.log(json.img1, "img1");
        console.log(json.user, "user");
    }

    const uploadImage = async () => {
        const fl = myimage.profileImage;
        let p2 = localStorage.getItem('user_id');
        console.log(fl, "fl");
        const formdata = new FormData();
        formdata.append('myimage', myimage.profileImage, myimage.profileImage.name);
        formdata.append('email', p2);
        let url = 'http://localhost:5000/api/file/uploadimage';
        try {
            let response = await axios.post(url, formdata);
            toast.success("Inserted Successfully");
            // localStorage.removeItem('token');
            console.log(response);
        }
        catch (e) {
            toast.error("Something Went Wrong");
        }
    }

    const imageUpload = (e) => {
        console.log(e.target.files[0]);
        setMyimage({ ...myimage, profileImage: e.target.files[0] });
    }

    const uploadPost = async () => {
        const fl = mypost.postImage;
        let p2 = localStorage.getItem('user_id');
        console.log(fl, "fl");
        const formdata = new FormData();
        formdata.append('mypost', mypost.postImage, mypost.postImage.name);
        formdata.append('email', p2);
        let url = 'http://localhost:5000/api/file/uploadpost';
        try {
            let response = await axios.post(url, formdata);
            toast.success("Inserted Successfully");
            // localStorage.removeItem('token');
            console.log(response);
        }
        catch (e) {
            toast.error("Something Went Wrong");
        }
    }

    const postUpload = (e) => {
        console.log(e.target.files[0]);
        setMypost({ ...mypost, postImage: e.target.files[0] });
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
        fetch_user();
    }, []);
    return (
        <div>
            <div className="row" style={{ height: "700px" }}>
                <div className="col-md-3 card" style={{}}>
                    <div className="card-body" style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <u><h3>My Profile</h3></u>
                        <div className="row">
                            <div className="col  my-3">
                                <img style={{ width: "100px", height: "100px" }} className="rounded-circle" alt="avatar1" src={`../../UserImages/${img1}`} />
                            </div>
                            <div className="col-md-7 my-5">
                                <form>
                                    <div className="form-group">
                                        <input onChange={imageUpload} type="file" className="form-control-file" name="myfile" id="myfile" />
                                        <button type="button" onClick={uploadImage} className="btn btn-primary my-3" style={{ width: "70px" }}>Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <hr />
                        <h4 className="my-3" style={{ color: "blue" }}>{user.name}</h4>
                        <hr />
                        <div>
                            <div className="flex items-center justify-center w-full">
                                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click here to New Post</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="post" onChange={postUpload} name="post" type="file" className="form-control-file" />
                                </label>
                            </div>
                            <button type="button" onClick={uploadPost} className="btn btn-primary" style={{ width: "95px", marginLeft: "100px" }}>Upload</button>
                        </div>
                    </div>
                </div>
                <div className="col card">
                    <div className="card-body" >
                        <u><h3 style={{ fontWeight: "bold" }}>About</h3></u>
                        <div className="container">
                            <div className="row my-5">
                                <div className="col" style={{ fontWeight: "bold" }}>
                                    Name
                                </div>
                                <div className="col">
                                    {user.name}
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col" style={{ fontWeight: "bold" }}>
                                    Email
                                </div>
                                <div className="col">
                                    {user.signupEmail}
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col" style={{ fontWeight: "bold" }}>
                                    district
                                </div>
                                <div className="col">
                                    {/* <div className="col-md-1 my-2"> */}
                                    {user.district}
                                </div>
                                {/* <div className="col">
                                    <button type="button" className="btn btn-danger" style={{ width: "70px" }}>Edit</button>
                                </div> */}
                            </div>
                            <div className="row my-5">
                                <div className="col" style={{ fontWeight: "bold" }}>
                                    Pincode
                                </div>
                                <div className="col">
                                    {user.pincode}
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col" style={{ fontWeight: "bold" }}>
                                    Ground
                                </div>
                                <div className="col">
                                    {user.place}
                                </div>
                                <div className="col">
                                    <Button style={{ color: "Red", fontWeight: "bold" }} onClick={handleOpen}>Update Location</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Update Location -
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                <form style={{ width: "300px" }} className="mt-8 space-y-6" method="POST">
                                                    <div className="mb-3">
                                                        <select className="form-select my-3" id="district" name="district" onChange={onChange} aria-label="Default select example">
                                                            <option selected>Choose Your City</option>
                                                            {city.map(place3 => <option key={place3} value={place3}>{place3}</option>)}
                                                        </select>
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
                                                    <p style={{ cursor: "pointer" }} onClick={handleSubmit} className="w-30 text-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700">
                                                        Update
                                                    </p>
                                                </form>
                                            </Typography>
                                        </Box>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile