import './chat.css'
import Hellen from '../../assets/Hellen.png'
import Hellen2 from '../../assets/hellen2.png'
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
    const [credentials, setCredentials] = useState({comment: ""})
    const handleSubmit = async (e) =>{  
        e.preventDefault();
        //    const tok1 = localStorage.getItem("token");
            let user_id = "dfs890804jflsdfoedsf432";
            const response = await fetch(`http://localhost:5000/api/videocomment/addcomments`, {
              method: 'POST',
              body: {
                'Content-Type': 'application/json',
                'user_id': user_id,
              },
              body: JSON.stringify({comment: credentials.comment}) 
            });
            const json = await response.json();
            if(json){
                // save the auth and redirect
                toast.success('commneted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                console.log("Successfully comment");
            }
            else
            {
                toast.error('You are not commented Failed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
              console.log("Invalid Detail");
            }
    }

    const onChange = (e)=>
    {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='chatContainer'>
            <ToastContainer />
            <div className="chatHeading">
                <p>Comments</p>
            </div>
            <div className="chatSearch">
                <input type="text" placeholder='Search for comments.' />
                <img src="https://img.icons8.com/ios-filled/20/ADA8A7/search--v1.png" alt="search" />
            </div>
            <div className="chat">
                <div className="reciever">
                    <img src={Hellen2} alt="" style={{ width: "50px", height: "50px" }} />
                    <div className="recieverText">
                        <p>Somnath Yadav dolor sit.</p>
                    </div>
                </div>
                <div className="reciever">
                    <img src={Hellen2} alt="" style={{ width: "50px", height: "50px" }} />
                    <div className="recieverText">
                        <p>Somnath Yadav dolor sit.</p>
                    </div>
                </div>
                <div className="sender">
                    <div className="senderText">
                        <p>Somnath Yadav dolor sit amet.</p>
                    </div>
                    <img src={Hellen} alt="" style={{ width: "50px", height: "50px" }} />
                </div>
                <div className="reciever">
                    <img src={Hellen2} alt="" style={{ width: "50px", height: "50px" }} />
                    <div className="recieverText">
                        <p>Somnath Yadav dolor sit.</p>
                    </div>
                </div>
                <div className="sender">
                    <div className="senderText">
                        <p>Somnath Yadav dolor sit amet.</p>
                    </div>
                    <img src={Hellen} alt="" style={{ width: "40px", height: "40px" }} />
                </div>
                <div className="reciever">
                    <img src={Hellen2} alt="" style={{ width: "40px", height: "40px" }} />
                    <div className="recieverText">
                        <p>Somnath Yadav dolor sit.</p>
                    </div>
                </div>
                <div className="sender">
                    <div className="senderText">
                        <p>Somnath Yadav dolor sit amet.</p>
                    </div>
                    <img src={Hellen} alt="" style={{ width: "50px", height: "50px" }} />
                </div>
                <div className="reciever">
                    <img src={Hellen2} alt="" style={{ width: "50px", height: "50px" }} />
                    <div className="recieverText">
                        <p>Somnath Yadav dolor sit.</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="message">
                <textarea id="txtarea" onChange={onChange} className="form-control"  name="comment" placeholder='Comment..' />
                <button type="submit" className="button1">
                    Send
                </button>
            </div>
            </form>
        </div>
    )
}

export default Chat