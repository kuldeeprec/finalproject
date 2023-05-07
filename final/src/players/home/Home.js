import { React, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./home.css";
import Comment from "./Comment";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  let navigate = useNavigate();
  const [pendPlayer, setPendPlayer] = useState([]);
  const fetchNoti_friend = async (event) => {
    let p2 = localStorage.getItem("user_id");
    const response = await fetch(
      `http://localhost:5000/api/playing_live/fetchsendnotification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: p2 }),
      }
    );
    const json = await response.json();
    setPendPlayer(json);
    console.log(json);
  };
  const [acceptPlayer, setAcceptPlayer] = useState([]);
  const fetchAccep_friend = async (event) => {
    let p2 = localStorage.getItem("user_id");
    const response = await fetch(
      `http://localhost:5000/api/playing_live/fetchaccept_reci_notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: p2 }),
      }
    );
    const json = await response.json();
    setAcceptPlayer(json);
    // console.log(json);
  };
  const [pendPlayerMe, setPendPlayerMe] = useState([]);
  const fetchNoti_friendMe = async (event) => {
    let p2 = localStorage.getItem("user_id");
    const response = await fetch(
      `http://localhost:5000/api/playing_live/fetchsendnotificationme`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: p2 }),
      }
    );
    const json = await response.json();
    setPendPlayerMe(json);
    // console.log(json);
  };
  const [acceptPlayerMe, setAcceptPlayerMe] = useState([]);
  const fetchAccep_friendMe = async (event) => {
    let p2 = localStorage.getItem("user_id");
    const response = await fetch(
      `http://localhost:5000/api/playing_live/fetchaccept_reci_notificationme`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: p2 }),
      }
    );
    const json = await response.json();
    setAcceptPlayerMe(json);
    // console.log(json);
  };

  const acc_playing_friend = async (mess_id, event) => {
    let p1 = event;
    console.log(mess_id, p1, "p1");
    let p2 = localStorage.getItem("user_id");
    const response = await fetch(
      `http://localhost:5000/api/playing_live/acceptpendsendnotification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ send_id: p1, reci_id: p2, mess_id: mess_id }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.message == "success") {
      toast.success("Accept Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/home");
    } else {
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
  };
  const del_playing_friend = async (event) => {
    let p1 = event;
    console.log(p1, "p1");
    let p2 = localStorage.getItem("user_id");
    const response = await fetch(
      `http://localhost:5000/api/playing_live/deletesendnotification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ send_id: p1, reci_id: p2 }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.message == "success") {
      toast.success("Deleted Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/home");
    } else {
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
  };

  const [allpost, setAllpost] = useState([]);
  const fetch_post = async () => {
    let p2 = localStorage.getItem("user_id");
    const response = await fetch(
      `http://localhost:5000/api/searchplayer/fetchpost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: p2 }),
      }
    );
    const json = await response.json();
    // console.log(typeof(json.all_post),"typeof");
    let post_ = [];
    json.all_post.forEach(function (item, index) {
      post_.push(item);
      // console.log(item, "yes");
    });
    setAllpost(post_);
  };

  const like_post = async (p2, p3) => {
    let p1 = localStorage.getItem("user_id");
    const response = await fetch(`http://localhost:5000/api/file/likepost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login_id: p1, poster_id: p3, post_obj_id: p2 }),
    });
    const json = await response.json();
    if (json.result == 0) {
      toast.error("Something Wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (json.result == 1) {
      toast.error("Disliked", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (json.result == 2) {
      toast.success("Liked", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    navigate("/home");
  };

  const [credentials, setCredentials] = useState("");
  const comment_post = async (p22, p32) => {
    let p1 = localStorage.getItem("user_id");
    const response = await fetch(`http://localhost:5000/api/file/postcomment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: credentials,
        login_id: p1,
        poster_id: p32,
        post_obj_id: p22,
      }),
    });
    const json = await response.json();
    if (json.result == 0) {
      toast.error("Something Wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (json.result == 1) {
      toast.success("Commented! Wow", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // const comment_submit = async (p2) => {
  //     let p1 = localStorage.getItem('user_id');
  //     const response = await fetch(
  //         `http://localhost:5000/api/file/postcomment`,
  //         {
  //             method: "POST",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ login_id: p1, poster_id: p2, message: comment_message })
  //         }
  //     );
  //     const json = await response.json();
  // }

  // const all_comment = async () => {

  // }

  const onChange = (e) => {
    setCredentials(e.target.value);
  };

  useEffect(() => {
    fetchNoti_friend();
    fetchAccep_friend();
    fetchNoti_friendMe();
    fetchAccep_friendMe();
    fetch_post();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="row">
        <div className="col">
          <aside id="sticky-div1" className="w-64" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span className="ml-3" style={{ fontWeight: "bold" }}>
                      My Profile
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/videohome"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 whitespace-nowrap"
                      style={{ fontWeight: "bold" }}
                    >
                      Video
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/maketeam"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 whitespace-nowrap"
                      style={{ fontWeight: "bold" }}
                    >
                      MakeTeam
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/friendrequest"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 whitespace-nowrap"
                      style={{ fontWeight: "bold" }}
                    >
                      Friend Request
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shophome"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 whitespace-nowrap"
                      style={{ fontWeight: "bold" }}
                    >
                      Products
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/friends"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 whitespace-nowrap"
                      style={{ fontWeight: "bold" }}
                    >
                      Friends
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="/chat"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 whitespace-nowrap"
                      style={{ fontWeight: "bold" }}
                    >
                      Messenger
                    </span>
                  </a>
                </li>
                {/* <li>
                                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                                        <span className="flex-1 ml-3 whitespace-nowrap" style={{ fontWeight: "bold" }}>Messenger</span>
                                    </a>
                                </li> */}
                {/* <li>
                                    <a href="/news" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                                        <span className="flex-1 ml-3 whitespace-nowrap" style={{fontWeight: "bold"}}>News</span>
                                    </a>
                                </li> */}
              </ul>
            </div>
          </aside>
        </div>
        <div className="col">
          {/* <div
                        className="100 items-center justify-center leading-7 space-y-8 p-8 h-full">
                        {allpost.forEach(function (item, index) {
                            <div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <img style={{ width: "60px", height: "60px" }} className="rounded-circle my-2" alt="avatar1" src={`../../../UserPosts/${item.image_file}`} />
                                    </div>
                                    <div className="col-md-2 my-3">
                                        <p style={{ fontSize: "15x", fontWeight: "bold" }}>Aiswariya Roy</p>
                                    </div>
                                </div>
                                <p>Make Change in thought, life automatically will Change . . .</p>
                                <img style={{ width: "300px", height: "300px" }} value={index} src={`/UserPosts/${item.image_file}`} alt="post_image" className="" />
                                <div className="row">
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-primary my-2" style={{ width: "100px" }}>Like</button>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-primary my-2" style={{ width: "100px" }}>Comment</button>
                                    </div>
                                </div>
                            </div>
                        })
                        }
                    </div> */}
          <div className="col">
            <div className="100 items-center justify-center leading-7 space-y-8 p-8 h-full">
              <div>
                <InfiniteScroll
                  dataLength={allpost.length} //This is important field to render the next data
                  next={fetch_post}
                  hasMore={false}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                  // below props only if you need pull down functionality
                >
                  {/* {allpost} */}
                  {allpost.map((item, index) => (
                    <div key={index}>
                      <div className="row">
                        <div className="col-md-2">
                          <img
                            style={{ width: "60px", height: "60px" }}
                            className="rounded-circle my-2"
                            alt="avatar1"
                            src={`../../../UserPosts/${item.image_file}`}
                          />
                        </div>
                        <div className="col-md-2 my-3">
                          <p style={{ fontSize: "15x", fontWeight: "bold" }}>
                            {item.name}
                          </p>
                        </div>
                      </div>
                      <p>
                        Make Change in thought, life automatically will Change .
                        . .
                      </p>
                      <img
                        style={{ width: "700px", height: "300px" }}
                        value={index}
                        src={`../../../UserPosts/${item.image_file}`}
                        alt="post_image"
                        className=""
                      />
                      <div className="row">
                        <div className="col-md-6">
                          <button
                            type="button"
                            onClick={() => like_post(item._id, item.poster_id)}
                            className="btn btn-primary my-2"
                            style={{ width: "100px" }}
                          >
                            {item.like.length} Like
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            type="button"
                            className="btn btn-primary my-2"
                            style={{ width: "100px" }}
                          >
                            Comment
                          </button>
                        </div>
                        <Comment id={item._id} />
                        <div className="mb-3">
                          {/* <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label> */}
                          <textarea
                            className="form-control"
                            onChange={onChange}
                            placeholder="Type Comment..."
                            id="comment"
                            name="comment"
                            rows="2"
                          ></textarea>
                        </div>
                        <button
                          type="button"
                          onClick={() => comment_post(item._id, item.poster_id)}
                          className="btn btn-success my-2 rounded"
                          style={{ width: "100px" }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <aside id="sticky-div2" className="w-66" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Pending Request(Other)</th>
                  </tr>
                </thead>
                <tbody>
                  {pendPlayer.length !== 0 ? (
                    pendPlayer.map((players) => (
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <span
                            className="flex-1 ml-3 whitespace-nowrap"
                            style={{ fontWeight: "bold" }}
                          >
                            {players.name}
                          </span>
                        </td>
                        <td>{players.message}</td>
                        <td
                          value={players.friend_id}
                          onClick={() =>
                            acc_playing_friend(players._id, players.friend_id)
                          }
                        >
                          <span className="inline-flex justify-center items-center">
                            <Link href="#">
                              <BsFillCheckCircleFill
                                style={{ fontSize: "30px" }}
                              />
                            </Link>
                          </span>
                        </td>
                        <td
                          onClick={() => del_playing_friend(players.friend_id)}
                        >
                          <span className="inline-flex justify-center items-center">
                            <Link href="#">
                              <RxCrossCircled style={{ fontSize: "30px" }} />
                            </Link>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>No Pending Player</p>
                  )}
                </tbody>
              </table>

              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Accepted Request(Other)</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptPlayer.length !== 0 ? (
                    acceptPlayer.map((players1) => (
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <span
                            className="flex-1 ml-3 whitespace-nowrap"
                            style={{ fontWeight: "bold" }}
                          >
                            {players1.name}
                          </span>
                        </td>
                        <td>{players1.message}</td>
                        {/* <td><span className="inline-flex justify-center items-center"><button type="button" className="btn btn-primary my-2" style={{ width: "80px" }}>Decline</button></span></td> */}
                        <td
                          onClick={() => del_playing_friend(players1.friend_id)}
                        >
                          <span className="inline-flex justify-center items-center">
                            <button
                              type="button"
                              className="btn btn-danger my-2"
                              style={{ width: "80px" }}
                            >
                              Delete
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>No Accepted Player</p>
                  )}
                </tbody>
              </table>
              {/* -------------------------------- */}
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Pending Request(Me)</th>
                  </tr>
                </thead>
                <tbody>
                  {pendPlayerMe.length !== 0 ? (
                    pendPlayerMe.map((players) => (
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <span
                            className="flex-1 ml-3 whitespace-nowrap"
                            style={{ fontWeight: "bold" }}
                          >
                            {players.name}
                          </span>
                        </td>
                        <td>{players.message}</td>
                        {/* <td value={players.friend_id} onClick={() => acc_playing_friend(players._id, players.friend_id)}><span className="inline-flex justify-center items-center"><Link href='#'><BsFillCheckCircleFill style={{ fontSize: "30px" }} /></Link></span></td> */}
                        <td
                          onClick={() => del_playing_friend(players.friend_id)}
                        >
                          <span className="inline-flex justify-center items-center">
                            <Link href="#">
                              <RxCrossCircled style={{ fontSize: "30px" }} />
                            </Link>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>No Pending Player</p>
                  )}
                </tbody>
              </table>

              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Accepted Request(Me)</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptPlayerMe.length !== 0 ? (
                    acceptPlayerMe.map((players1) => (
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <span
                            className="flex-1 ml-3 whitespace-nowrap"
                            style={{ fontWeight: "bold" }}
                          >
                            {players1.name}
                          </span>
                        </td>
                        <td>{players1.message}</td>
                        {/* <td><span className="inline-flex justify-center items-center"><button type="button" className="btn btn-primary my-2" style={{ width: "80px" }}>Decline</button></span></td> */}
                        <td
                          onClick={() => del_playing_friend(players1.friend_id)}
                        >
                          <span className="inline-flex justify-center items-center">
                            <button
                              type="button"
                              className="btn btn-danger my-2"
                              style={{ width: "80px" }}
                            >
                              Delete
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>No Accepted Player</p>
                  )}
                </tbody>
              </table>
              {/* {pendPlayer.map(players =>
                                <ul className="space-y-2">
                                    <li onClick={acc_playing_friend}>
                                        <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span className="flex-1 ml-3 whitespace-nowrap" style={{ fontWeight: "bold" }}>{players.name}</span>
                                            <span className="inline-flex justify-center items-center"><Link href='#'><BsFillCheckCircleFill style={{ fontSize: "30px" }} /></Link></span>
                                        </div>
                                    </li>
                                </ul>
                            )} */}
              {/* <h3 className="flex-1 ml-3 whitespace-nowrap mx-5 text-blue-600">Accepted Request</h3>
                            {acceptPlayer.map(players1 =>
                                <ul className="space-y-2">
                                    <li>
                                        <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span className="flex-1 ml-3 whitespace-nowrap" style={{ fontWeight: "bold" }}>{players1.name}</span>
                                            <span className="inline-flex justify-center items-center"><button type="button" className="btn btn-danger my-2" style={{ width: "80px" }}>Decline</button></span>
                                        </div>
                                    </li>
                                </ul>
                            )} */}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
