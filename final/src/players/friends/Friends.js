import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import './friends.css'
import { ToastContainer, toast } from 'react-toastify';

const Friends = () => {

    let navigate = useNavigate();
    const [ConfirmFriend, setConfirmFriend] = useState([])
    const [pro_img, setPro_img] = useState([])
    const FetchConfirmFriend = async () => {
        const p = localStorage.getItem('user_id');
        console.log(p, "p");
        const response = await fetch(
            `http://localhost:5000/api/friends/fetchconfirmfriend`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: p })
            }
        );
        const json = await response.json();
        setConfirmFriend(json[0].friends);
        setPro_img(json[0].profile_img[0].image_profile);
        console.log(json[0].profile_img[0].image_profile, "json[0].profile_img");
        console.log(json[0].friends, "json");
    }
    const del_confirm_friend = async (event) => {
        let p1 = event;
        console.log(p1, "p1");
        let p2 = localStorage.getItem('user_id');
        const response = await fetch(
            `http://localhost:5000/api/friends/deleteconfirmfriend`,
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
        navigate("/friends");
    }


    useEffect(() => {
        FetchConfirmFriend();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {ConfirmFriend.length == 0 && <div className="row my-5"><h5 className="text-center col">You have not a friend, currently</h5><Link to='/maketeam' className="col">Make Friend</Link></div>}
                {ConfirmFriend.map(players => <div className="col-md-3">
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                <div>
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-cover object-center block" src={`../../../UserImages/${players.profile_img}`} style={{ width: "250px", height: "350px" }} />
                                    </a>
                                    <div className="mt-4 text-center">
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{players.name}</h2>
                                        <span className="justify-center items-center"><button type="button" onClick={() => del_confirm_friend(players.friend_id)} className="btn btn-primary my-2" style={{ width: "100px" }}>Delete</button></span>
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

export default Friends