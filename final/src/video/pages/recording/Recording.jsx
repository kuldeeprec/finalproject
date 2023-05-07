import React, { useState,useRef } from 'react'
import moment from 'moment';
// import Navbar from '../../components/Navbar/Navbar'
import next from '../../assets/next.png'
import './recording.css'
import Stats from '../../components/stats/Stats'
import Chat from '../../components/chat/Chat'
import Interest from '../../components/interest/Interest';
import ReactPlayer from 'react-player';
import Transcript from '../../components/transcript/Transcript';
import Controls from './Controls';
const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};
const Recording = () => {

  const [change, setChange] = useState(false)
  const [isTranscript, setIsTranscript] = useState(false)
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [speed, setSpeed] = useState("1x")
  
  const [isNav , setIsNav ] = useState({
    openInterest : false,
    openInteraction : false,
    openCompany : false,
    openSlides : false,
  })

  const [states, setStates] = useState({
    playing: false,
    duration: 0,
    playbackSpeed: 1,
    playedSeconds: 0,
    played: 0,
    loaded: 0,
    loadedSeconds: 0,
    seeking: false,
  })
  const controlsRef = useRef(null);
  const playerRef = useRef(null);
  const { playing, playedSeconds, duration, playbackSpeed, loaded, played } = states
  
  const handleDuration = (duration) => {
    const totalDuration = new Date(duration * 1000).toISOString().slice(11, 19);
    // console.log(totalDuration)
    setStates({
      ...states,
      duration: totalDuration
    })
  }
  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setStates({ ...states, played: parseFloat(newValue / 100) });
  };
  const handleSeekMouseDown = (e) => {
    setStates({ ...states, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setStates({ ...states, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };
  const handleEnd = () => {
    setStates({
      ...states,
      playing: false,
    })
  }

  const handleProgress = (changeState) => {
    if (!states.seeking) {
      setStates({ ...states, ...changeState });
    }
  };


  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration2 =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration2 - currentTime)}`;

  const totalDuration = format(duration2);
  console.log(elapsedTime,totalDuration);
  const formatDate = moment().format('LL')
  return (
    <>
      {/* <Navbar type = 'recording' /> */}
      <div className='headerWrapper'>
        <div className="topics">
          <div className="topic" onClick={() => { setIsNav({
            openCompany : false,
            openInterest : (!isNav.openInterest),
            openInteraction : false,
            openSlides : false
          }) }}>
            <p>Next Video</p>
          </div>
        </div>
        <div className="date">
          {formatDate}
        </div>
      </div>
      <div className='recordingWrapper'>
        {isNav.openInteraction && <Stats />}
        {isNav.openInterest && <Interest />}
        {!isTranscript &&
          <>
            <div className={((isNav.openInterest || isNav.openInteraction || isNav.openCompany || isNav.openSlides) ? 'playerWrapper' : 'playerWrapper2')}>
              <div className="Player2">
                <ReactPlayer
                  ref={playerRef}
                  url='https://www.youtube.com/watch?v=m8u-18Q0s7I'
                  // url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
                  width='100%'
                  height='100%'
                  playing={playing}
                  // onDuration={handleDuration}
                  onEnded={handleEnd}
                  playbackRate={playbackSpeed}
                  onProgress={handleProgress}
                />
              </div>
            </div>
          </>
        }
        {isTranscript &&
          <div className="transcriptApp">
            <Transcript isNav = {isNav} />
          </div>
        }
        <Chat />
      </div>
      <div className="twoicons">
        <div className="first">
          <img src={next} alt="" style={{ width: "24px", height: "24px" }} />
        </div>
        <div className="second">
          <img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/30/3F51B5/external-plus-user-interface-tanah-basah-glyph-tanah-basah-2.png" alt="" />
        </div>
      </div>
      <div className="recording">
        <div className='divider'></div>
        <div className="part2">
          <div className="upper">
            {/* <div className='button'>
              <p onClick={()=>setIsTranscript(false)}>Video</p>
            </div> */}
            <div className="controllers">
              <img src="https://img.icons8.com/external-inkubators-glyph-inkubators/20/ffffff/external-previous-video-interface-inkubators-glyph-inkubators.png" alt="previous" className='previous' />
              <img src={(playing & !isTranscript) ? "https://img.icons8.com/ios/40/FFFFFF/circled-pause.png" : "https://img.icons8.com/ios/40/ffffff/play-button-circled--v1.png"} alt="play" className='play' onClick={() => setStates({
                ...states,
                playing: (!playing)
              })} />
              <img src="https://img.icons8.com/ios-filled/24/ffffff/end--v1.png" alt="next" className='next' />
            </div>
            {/* <div className='button'>
              <p onClick={()=>setIsTranscript(true)}>Transcript</p>
            </div> */}
          </div>
          <div className="lower">
            <div className="current">{elapsedTime}</div>
            <div className="length">
              {/* <div className="loadedLength" style={{ width: `${loaded * 100}%`, height: '5px', backgroundColor: 'white', zIndex: '1', position: 'absolute' }}></div>
             <div className="playedLength" style={{ width: `${played * 100}%`, height: '5px', backgroundColor: '#3F51B5', zIndex: '2', position: 'absolute' }}></div> */}
              <Controls
            ref={controlsRef}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            onDuration={handleDuration}
            playing={playing}
            played={played}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
          />
            </div>
            <div className="total">{totalDuration}</div>
            
          </div>
        </div>
        <div className='divider'></div>
        <div className="part3">
          <div className='head'>Speed</div>
          <div className="ok">
            {change &&
              <>
                <div className="options">
                  <div className="option" onClick={() => {
                    setSpeed("0.5x"); setChange(!change); setStates({
                      ...states,
                      playbackSpeed: 0.5
                    })
                  }}>0.5x</div>
                  <div className="option" onClick={() => {
                    setSpeed("1x"); setChange(!change); setStates({
                      ...states,
                      playbackSpeed: 1
                    })
                  }}>1.0x</div>
                  <div className="option" onClick={() => {
                    setSpeed("1.5x"); setChange(!change); setStates({
                      ...states,
                      playbackSpeed: 1.5
                    })
                  }}>1.5x</div>
                  <div className="option" onClick={() => {
                    setSpeed("2x"); setChange(!change); setStates({
                      ...states,
                      playbackSpeed: 2
                    })
                  }}>2x</div>
                </div>
              </>
            }
            <div className="speed" onClick={(e) => setChange(!change)}>
              <div className='option1'>{speed}</div>
              <img src="https://img.icons8.com/material/24/ffffff/sort-down--v1.png" alt="speed" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Recording