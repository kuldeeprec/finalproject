import { React, useState } from 'react'
import './maketeam.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MakeTeam = () => {

  // ----------------------Set a Pin-------------------
  const [pin, setPin] = useState()
  const [playPlace, setPlayPlace] = useState([]);
  const checkArea = async () => {
    let allArea = await fetch(`https://api.postalpincode.in/pincode/${pin}`)
    let allAreaJson = await allArea.json();
    //  console.log(pinJson,"pinJson");
    let location
    Object.entries(allAreaJson).forEach(([key, value]) => {
      location = value;
      // console.log(location,"location");
    })
    let loc;
    Object.entries(location).forEach(([key, value]) => {
      if (key === "PostOffice") {
        loc = value;
        // console.log(value);
      }
    })
    let place = [];
    for (let i = 0; i < loc.length; i++) {
      // place = loc[i].Name;
      place.push(loc[i].Name)
      // console.log(loc[i].Name)
    }
    setPlayPlace(place);
  }


  const onChangePin = (e) => {
    setPin(e.target.value)
  }

  const [playPlayers1, setPlayPlayers1] = useState([]);
  const [playPlayers2, setPlayPlayers2] = useState([]);
  const [playPlayers3, setPlayPlayers3] = useState([]);
  const [mapfriend, setMapfriend] = useState(new Map());
  const searchPlayer = async (e) => {
    let p = localStorage.getItem('user_id');
    let grname = e;
    console.log(grname, "grname");
    const response = await fetch(
      `http://localhost:5000/api/searchplayer/getplayer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groundname: grname, groundpin: pin, user_id: p })
      }
    );
    const json = await response.json();
    const json1 = json.user;
    const json2 = json.pending_friends_send;
    const json3 = json.pending_friends_reci;
    const json4 = json.confirm_friends_send;
    console.log(json1, json2, json3, json4, "json1")
    const pending_friends = new Map();
    let newjson = json1.filter((item) => item.signupEmail !== p);
    setPlayPlayers1(newjson);

    newjson.map(players => {
      pending_friends.set(players.signupEmail, "0");
    })

    // list of confirm friend
    // let con_fri = [];
    newjson.map(players => {
      json4.map(player_obj => {
        if (player_obj.friend_id == players.signupEmail) {
          // con_fri.push(players);
          pending_friends.set(player_obj.friend_id, "1")
        }
      })
    })
    // setPlayPlayers1(con_fri);

    // // list of not friend and also find pending recieve and sender friend store in pen_fri.
    // let not_fri = newjson;
    // let pen_fri = [];
    newjson.map(players => {
      json2.map(player_obj => {
        // console.log(player_obj,"pen_play")
        // pen_fri.push(player_obj);
        console.log(players.signupEmail, player_obj.friend_id, "player_obj.friend_id");
        if (player_obj.friend_id == players.signupEmail) {
          // con_fri.push(players);
          console.log(player_obj.friend_id, "player_obj.friend_id");
          pending_friends.set(player_obj.friend_id, false)
        }
        // not_fri = not_fri.filter((item) => item.signupEmail !== player_obj.friend_id);
      })
    })
    newjson.map(players => {
      json3.map(player_obj => {
        // pen_fri.push(player_obj);
        if (player_obj.friend_id == players.signupEmail) {
          // con_fri.push(players);
          pending_friends.set(player_obj.friend_id, true)
        }
        // not_fri = not_fri.filter((item) => item.signupEmail !== player_obj.friend_id);
      })
    })
    // json4.map(player_obj => {
    //   not_fri = not_fri.filter((item) => item.signupEmail !== player_obj.friend_id);
    // })
    // json1.map(player_obj => {
    //   not_fri = not_fri.filter((item) => item.signupEmail !== player_obj.signupEmail);
    // })
    // // let pen_fri1 = pen_fri;
    // newjson.map(player_obj => {
    //   pen_fri = pen_fri.filter((item) => item.friend_id !== player_obj.signupEmail);
    // })

    // setPlayPlayers2(pen_fri) 
    // setPlayPlayers3(not_fri)
    // pending_friends.set(players.signupEmail, false)
    setMapfriend(pending_friends);
  }

  const PendingFriend = async (event) => {
    let p1 = event;
    let p2 = localStorage.getItem('user_id');
    // console.log(p1, p2, "p");
    const response = await fetch(
      `http://localhost:5000/api/friends/pendingfriend`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender_id: p2, reciver_id: p1 })
      }
    );
    const json = await response.json();
    if (json) {
      toast.success("Send Successfully");
    }
    else {
      toast.error("Send Failed");
    }
    // console.log(json);
  }

  const addFriend = async (event) => {
    let p1 = event;
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
    console.log(json);
    if (json) {
      toast.success("added Successfully");
    }
    else {
      toast.error("Added Failed");
    }
  }

  const [credentials, setCredentials] = useState({ message: "", playing_date: "" });

  const handleSubmit = async (e) => {
    // let p1 = e.target.value;
    console.log(e, "e");
    console.log(credentials.message, credentials.playing_date, "p1");
    let p2 = localStorage.getItem('user_id');
    const response = await fetch(`http://localhost:5000/api/playing_live/savemessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: credentials.message, playing_date: credentials.playing_date, send_id: p2, reci_id: e })
    });
    const json = await response.json();
    console.log(json);
    if (json.message == "success") {
      toast.success('Request Send Successfully!', {
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
      toast.error('Already Sent or Request Failed!', {
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
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className="my-1">
        <ToastContainer />
        <div className="row">
          <div className="col-sm text-center" style={{
            backgroundImage: `url(../img/world_map_hd.jpg)`
          }}>
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-center mb-4 text-blue-300 my-5" style={{ "color": "#3F51B5" }}><u>Find Players</u></h1>
              <h3 className="font-normal mt-2 text-center text-blue-300 font-weight-bold my-5" style={{ "color": "#3F51B5" }}><u>Find players by filling this form. </u></h3>

              <input onChange={onChangePin} type="text" name="" placeholder="Enter Your Pincode" id="" className="border-b-2 p-4" /><br />
              <button type="submit" onClick={checkArea} className="w-30 my-3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700">
                Search
              </button>
            </div>
            <div className="row">
              {playPlace.map(place => <button type="button" key={place} onClick={() => searchPlayer(place)} value={place} className="btn btn-primary my-2"><h5>{place}</h5></button>)}
            </div>

          </div>
          <div className="col-sm" id="plDetail">
            <div
              className="100 items-center justify-center leading-7 space-y-8 p-8 h-full">
              {playPlayers1.map(players => <div>
                {console.log(players.friend_id, "yes")}
                <div className="row">
                  <div className="col-md-2">
                    <img style={{ width: "60px", height: "60px" }} className="rounded-circle my-2" alt="avatar1" src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" />
                  </div>
                  <div className="col-md-2 my-3">
                    <p style={{ fontSize: "15x", fontWeight: "bold" }}>{players.name}</p>
                  </div>
                </div>
                <p>Make Change in thought, life automatically will Change . . .</p>
                <img src="https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80/200x100/d4d4d4/000000" alt="" className="" />
                <div className="row">
                  <div className="col my-3">
                    <div>
                      <div className="row">
                        <div className="col-md-3">
                          <input id="message" style={{ width: "150px" }} onChange={onChange} type="text" name="message" className="form-control" placeholder="Message" />
                        </div>
                        <div className="col-md-3">
                          <input id="playing_date" style={{ width: "150px" }} onChange={onChange} type="text" name="playing_date" className="form-control" placeholder="DD-MM-YYYY" />
                        </div>
                        <div className="col-md-3">
                          <button type="submit" value={players.signupEmail} onClick={() => handleSubmit(players.signupEmail)} className="btn btn-primary" style={{ width: "150px" }}>Send</button>
                        </div>
                        {mapfriend.get(players.signupEmail) === "1" &&
                          <div className="col-md-3">
                            <button type="button" value={players.signupEmail} className="btn btn-success" style={{ width: "150px" }}>Friend</button>
                          </div>}
                        {mapfriend.get(players.signupEmail) === false &&
                          <div className="col-md-3">
                            <button type="button" value={players.friend_id} className="btn btn-primary" style={{ width: "150px" }}>Pending</button>
                          </div>}
                        {mapfriend.get(players.signupEmail) === true &&
                          <div className="col-md-3">
                            <button type="button" onClick={() => addFriend(players.signupEmail)} value={players.friend_id} className="btn btn-primary" style={{ width: "150px" }}>Confirm</button>
                          </div>}
                        {mapfriend.get(players.signupEmail) === "0" &&
                          <div className="col-md-3">
                            <button type="submit" onClick={() => PendingFriend(players.signupEmail)} className="btn btn-success" style={{ width: "150px" }}>Add Friend +</button>
                          </div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
              {console.log(playPlayers2, "playPlayers2")}
              {playPlayers2.map(players => <div>
                <div className="row">
                  <div className="col-md-2">
                    <img style={{ width: "60px", height: "60px" }} className="rounded-circle my-2" alt="avatar1" src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" />
                  </div>
                  <div className="col-md-2 my-3">
                    <p style={{ fontSize: "15x", fontWeight: "bold" }}>{players.name}</p>
                  </div>
                </div>
                <p>Make Change in thought, life automatically will Change . . .</p>
                <img src="https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80/200x100/d4d4d4/000000" alt="" className="" />
                <div className="row">
                  {mapfriend.get(players.friend_id) === false ?
                    (<div className="col-md-3 my-2">
                      <button type="button" onClick={PendingFriend} value={players.signupEmail} className="btn btn-success my-2" style={{ width: "150px" }}>Pending</button>
                    </div>) :
                    (<div className="col-md-3 my-2">
                      <button type="button" onClick={addFriend} value={players.friend_id} className="btn btn-primary my-2" style={{ width: "150px" }}>Confirm</button>
                    </div>)}
                </div>
              </div>)}
              {
                playPlayers3.map(players => <div>
                  <div className="row">
                    <div className="col-md-2">
                      <img style={{ width: "60px", height: "60px" }} className="rounded-circle my-2" alt="avatar1" src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" />
                    </div>
                    <div className="col-md-2 my-3">
                      <p style={{ fontSize: "15x", fontWeight: "bold" }}>{players.name}</p>
                    </div>
                  </div>
                  <p>Make Change in thought, life automatically will Change . . .</p>
                  <img src="https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80/200x100/d4d4d4/000000" alt="" className="" />
                  <div className="row">
                    <div className="col-md-3 my-2">
                      <button type="button" onClick={PendingFriend} value={players.signupEmail} className="btn btn-primary my-2" style={{ width: "150px" }}>Add Friend +</button>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div >

    </div >
  )
}

export default MakeTeam
