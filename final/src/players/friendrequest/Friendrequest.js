import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Friendrequest = () => {

    let navigate = useNavigate();
    const addFriend = async (event) => {
        let p1 = event.target.value;
        let p2 = localStorage.getItem('user_id');
        console.log(p1, p2, "p2");
        const response = await fetch(
            `http://localhost:5000/api/friends/confirmfriend`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reciever_id: p2, sender_id: p1 })
            }
        );
        const json = await response.json();
        // console.log(json);
        if (json.message == "success") {
            toast.success('Confirm Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.error('Failed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        navigate("/friend");
    }
    const [PendingFriend, setPendingFriend] = useState([])
    const [PendingFriendMe, setPendingFriendMe] = useState([])
    const FetchPendingFriend = async () => {
        const p = localStorage.getItem('user_id');
        console.log(p, "p");
        const response = await fetch(
            `http://localhost:5000/api/friends/fetchpendingfriend`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: p })
            }
        );
        const json = await response.json();
        setPendingFriend(json[0].pending_friends_reciever);
        setPendingFriendMe(json[0].pending_friends_sender)
        // console.log(json[0], "json");
    }
    const del_pend_friend = async (event) => {
        let p1 = event;
        console.log(p1, "p1");
        let p2 = localStorage.getItem('user_id');
        const response = await fetch(
            `http://localhost:5000/api/friends/deletependfriend`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ send_id: p1, reci_id: p2 })
            }
        );
        const json = await response.json();
        console.log(json);
        if (json.message == "success") {
            toast.success('Deleted Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/friendrequest");
        }
        else {
            toast.error(json.message, {
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
    const del_pend_friend_me = async (event) => {
        let p1 = event;
        console.log(p1, "p1");
        let p2 = localStorage.getItem('user_id');
        const response = await fetch(
            `http://localhost:5000/api/friends/deletependfriendme`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ send_id: p1, reci_id: p2 })
            }
        );
        const json = await response.json();
        console.log(json);
        if (json.message == "success") {
            toast.success('Deleted Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/friendrequest");
        }
        else {
            toast.error(json.message, {
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

    useEffect(() => {
        FetchPendingFriend();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {PendingFriend.length == 0 && <div className="row my-5"><h5 className="text-center col">You have not a pending friend request, currently</h5><Link to='/maketeam' className="col">Make Friend </Link></div>}
                {PendingFriend.map(players => <div className="col-md-3">
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                <div>
                                    <a className="block relative rounded overflow-hidden">
                                        {/* <img alt="ecommerce" className="object-cover object-center block" src="https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80/200x100/d4d4d4/000000" style={{ width: "250px", height: "350px" }} /> */}
                                        <img alt="ecommerce" className="object-cover object-center block" src={`../../../UserImages/${players.profile_img}`} style={{ width: "250px", height: "350px" }} />
                                    </a>
                                    <div className="mt-4 text-center">
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{players.name}</h2>
                                        <span className="justify-center items-center mx-3"><button type="button" onClick={addFriend} value={players.friend_id} className="btn btn-primary" style={{ width: "100px" }}>Confirm</button></span>
                                        <span className="justify-center items-center"><button type="button" onClick={() => del_pend_friend(players.friend_id)} className="btn btn-primary my-2" style={{ width: "100px" }}>Delete</button></span>
                                        <div className="mt-1">
                                        </div>
                                        <div className="mt-1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>)}
            </div>

            <div className="row">
                {PendingFriendMe.map(players => <div className="col-md-3">
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                <div>
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-cover object-center block" src={`../../../UserImages/${players.profile_img}`} style={{ width: "250px", height: "350px" }} />
                                    </a>
                                    <div className="mt-4 text-center">
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{players.name}</h2>
                                        <span className="justify-center items-center mx-3"><button type="button" onClick={addFriend} value={players.friend_id} className="btn btn-primary" style={{ width: "100px" }}>Pending</button></span>
                                        <span className="justify-center items-center"><button type="button" onClick={() => del_pend_friend_me(players.friend_id)} className="btn btn-primary my-2" style={{ width: "100px" }}>Delete</button></span>
                                        <div className="mt-1">
                                        </div>
                                        <div className="mt-1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>)}
            </div>
        </div>
    )
}

export default Friendrequest