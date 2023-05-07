import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import './home.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import performer from '../../assets/performer.png'
import call from '../../assets/call.png'
import { AiOutlinePlus } from 'react-icons/ai';
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

export const todayHighlight = [
    { id: 1, heading: 'Heading', date: 'Jul 19, 2022', RepsName: 'Reps Name', companyName: 'ABC Company' },
    { id: 2, heading: 'Heading', date: 'Jul 19, 2022', RepsName: 'Reps Name', companyName: 'ABC Company' },
    { id: 3, heading: 'Heading', date: 'Jul 19, 2022', RepsName: 'Reps Name', companyName: 'ABC Company' },
    { id: 3, heading: 'Heading', date: 'Jul 19, 2022', RepsName: 'Reps Name', companyName: 'ABC Company' },
]

export const myChart = {
    labels: ['Extremely well', 'Somewhat well', 'Not so well'],
    datasets: [{
        label: '%',
        data: [40, 230, 90],
        backgroundColor: ['#888888', '#E5EFFF', '#3F51B5'],
    }]
}

const VideoHome = () => {

    const [battingvideo, setBattingvideo] = useState([])

    const fetchbattingvideo = async () => {
        const response = await fetch(
            `http://localhost:5000/api/videocontent/fetchallbattingvideo`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                  },
            }
        );
        const json = await response.json();
        const data = json.content;
        console.log(data);
        console.log(data);
        setBattingvideo(data);
        // getData(data);
        if (data) {
            console.log("thread fetch succesfully");
        } else {
            console.log("thread fetch Failed");
        }
    };

    useEffect(() => {
        fetchbattingvideo();
    }, []);

    return (
        <>
            {/* <Navbar type='home' /> */}
            <div className='homeWrapper'>
                <div className="homeHeader">
                    <div className="homeHeaderHeading">Dashboard</div>
                </div>
                <div className="homeBody">
                    <div className="homeBody1">
                        <div className="homeBody1Part1">
                            <div className="part1part1">
                                <div className="partHead">Total Videos</div>
                                <div className="partNumber">150</div>
                            </div>
                            <div className="part1part1">
                                <div className="partHead">View Videos</div>
                                <div className="partNumber">90</div>
                            </div>
                            {/* <div className="part1part1">
                                <div className="partHead">Active Deals</div>
                                <div className="partNumber">60</div>
                            </div> */}
                        </div>
                        <div className="homeBody1Part2">
                            {/* <div className="partHead">Today's Highlight</div>
                            {
                                todayHighlight.map((data, i) => (
                                    <div className='highlights'>
                                        <div className="partHead" style={{ color: '#3F51B5' }} >{data.heading}</div>
                                        <div className="partSubHead">{data.date}, {data.RepsName}, {data.companyName}</div>
                                    </div>
                                ))
                            } */}
                        </div>
                        <div className="homeBody1Part3">
                            <div className="partHeader">
                                <div className="partHead">Somnath Yadav</div>
                                <div className="partSubHead">Congratulations!</div>
                            </div>
                            <div className="img">
                                <img src={performer} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="homeBody2">
                        <div className="homeBody2Part1">
                            <div className="partHead">Player Performance</div>
                            <div className="pieChart">
                                <Pie data={myChart} options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: "right"
                                        }
                                    }
                                }} width='255px' height='255px' />
                            </div>
                        </div>
                        <div className="homeBody2Part2">
                            <div className="homeBodyPerformanceHeader">
                                <div className="partHead" style={{ fontWeight: '700', fontSize: '16px' }} >Recent Playing Videos</div>
                                <div className="homeBodyHeaderGap"></div>
                                {/* <div className="homeBodyHeader2">
                                    <div className="partHead" style={{ fontWeight: '400' }}>Recordings</div>
                                </div> */}
                            </div>
                            <div className="highlights" style={{ gap: '15px', paddingLeft: '10px' }} >
                                <div className="partHead" style={{ color: '#3F51B5', fonstSize: '15px' }}>Today</div>
                                <div className="performanceHeadingData">
                                    <div className="recentCallsImg">
                                        <img src={call} alt="" />
                                    </div>
                                    <div className="partHeader">
                                        <div className="partHead">ABC Batting</div>
                                        <div className="partSubHead">Date</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="homeBody3">
                        <div className="partHead" style={{ fontSize: '16px', fontWeight: '700' }} >Video Playlist</div>
                        <div className="homeBody3Part1">
                            <div className="partHead" style={{ fontSize: '15px', fontWeight: '700' }} >Batting</div>
                            <div className="HoverWrapper">
                                <div className="homeBody3Part1Part" style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className="rectIcon"></div>
                                    <div className='highlights' style={{ borderBottom: '0px' }} >
                                        <p>
                                            <button className="btn btn-primary" style={{ "width": "280px" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample11" aria-expanded="false" aria-controls="collapseExample">
                                            <div className="row"><div className="col-md-1"><AiOutlinePlus /></div><div className="col">Video 1 </div></div>   
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample11">
                                            {/* {
                                                    battingvideo.map((item, i) => (
                                                        <div className="card card-body">
                                                            <Link to="/recording">{item.videoTitle}</Link>
                                                        </div>
                                                    ))
                                            } */}

                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="homeBody3Part1Part" style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className="rectIcon"></div>
                                    <div className='highlights' style={{ borderBottom: '0px' }} >
                                        <p>
                                            <button className="btn btn-primary" style={{ "width": "280px" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample12" aria-expanded="false" aria-controls="collapseExample">
                                                <div className="row"><div className="col-md-1"><AiOutlinePlus /></div><div className="col">Video 2 </div></div>  
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample12">
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="homeBody3Part1Part" style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className="rectIcon"></div>
                                    <div className='highlights' style={{ borderBottom: '0px' }} >
                                        <p>
                                            <button className="btn btn-primary" style={{ "width": "280px" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample13" aria-expanded="false" aria-controls="collapseExample">
                                                <div className="row"><div className="col-md-1"><AiOutlinePlus /></div><div className="col">Video 3 </div></div>  
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample13">
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="homeBody3Part1">
                            <div className="partHead" style={{ fontSize: '15px', fontWeight: '700' }} >Bowling</div>
                            <div className="HoverWrapper">
                                <div className="homeBody3Part1Part" style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className="rectIcon"></div>
                                    <div className='highlights' style={{ borderBottom: '0px' }} >
                                        <p>
                                            <button className="btn btn-primary text-center" style={{ "width": "280px" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample21" aria-expanded="false" aria-controls="collapseExample">
                                                <div className="row"><div className="col-md-1"><AiOutlinePlus /></div><div className="col">Video 1 </div></div>  
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample21">
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="homeBody3Part1Part" style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className="rectIcon"></div>
                                    <div className='highlights' style={{ borderBottom: '0px' }} >
                                        <p>
                                            <button className="btn btn-primary" style={{ "width": "280px" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample22" aria-expanded="false" aria-controls="collapseExample">
                                                <div className="row"><div className="col-md-1"><AiOutlinePlus /></div><div className="col">Video 2 </div></div>  
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample22">
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="homeBody3Part1Part" style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className="rectIcon"></div>
                                    <div className='highlights' style={{ borderBottom: '0px' }} >
                                        <p>
                                            <button className="btn btn-primary" style={{ "width": "280px" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample23" aria-expanded="false" aria-controls="collapseExample">
                                                <div className="row"><div className="col-md-1"><AiOutlinePlus /></div><div className="col">Video 3 </div></div>  
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample23">
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="homeBody3Part1">
                            <div className="partHead" style={{ fontSize: '15px', fontWeight: '700' }} >Fielding</div>
                            <div className="HoverWrapper">
                                <div className="homeBody3Part1Part" style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className="rectIcon"></div>
                                    <div className='highlights' style={{ borderBottom: '0px' }} >
                                        <p>
                                            <button className="btn btn-primary" style={{ "width": "280px" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample31" aria-expanded="false" aria-controls="collapseExample">
                                                <div className="row"><div className="col-md-1"><AiOutlinePlus /></div><div className="col">Video 1 </div></div>  
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample31">
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="homeBody3Part1Part" style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className="rectIcon"></div>
                                    <div className='highlights' style={{ borderBottom: '0px' }} >
                                        <p>
                                            <button className="btn btn-primary" style={{ "width": "280px" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample32" aria-expanded="false" aria-controls="collapseExample">
                                                <div className="row"><div className="col-md-1"><AiOutlinePlus /></div><div className="col">Video 2 </div></div>  
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample32">
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="homeBody3Part1Part" style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className="rectIcon"></div>
                                    <div className='highlights' style={{ borderBottom: '0px' }} >
                                        <p>
                                            <button className="btn btn-primary" style={{ "width": "280px" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample33" aria-expanded="false" aria-controls="collapseExample">
                                                <div className="row"><div className="col-md-1"><AiOutlinePlus /></div><div className="col">Video 3 </div></div>  
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample33">
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                            <div className="card card-body">
                                                <Link to="/recording">How To Pick The Bat</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoHome