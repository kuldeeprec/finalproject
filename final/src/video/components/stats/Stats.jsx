import './stats.css'
import tips from '../../assets/tips.png'

const Stats = () => {
  return (
    <div className='statsWrapper'>
        <div className="stats">
          <div className="statsHeading">
            <p>Interaction Stats</p>
          </div>
          <div className="statsTip">
            <img src={tips} alt="" />
            <p>1 tip for employee.</p>
          </div>
          <div className="statsContainer">
            <div className="containerHeading">Talk Ratio</div>
            <div className="containerHeading">11%</div>
            <div className="containerSub">
              <div className="circle"></div>
              <div className="text">
                Within recommended range
              </div>
            </div>
          </div>
          <div className="statsContainer">
            <div className="containerHeading">Longest Monologue</div>
            <div className="containerHeading">2:09min</div>
            <div className="containerSub">
              <div className="circle"></div>
              <div className="text">
                Within recommended range
              </div>
            </div>
          </div>
          <div className="statsContainer">
            <div className="containerHeading">Longest Customer Story</div>
            <div className="containerHeading">4:14min</div>
            <div className="containerSub">
              <div className="circle"></div>
              <div className="text">
                Within recommended range
              </div>
            </div>
          </div>
          <div className="statsContainer">
            <div className="containerHeading">Interactivity</div>
            <div className="containerHeading">2.7</div>
            <div className="containerSub">
              <div className="circle" style={{backgroundColor:"rgb(232, 232, 18)"}}></div>
              <div className="text">
                Within recommended range
              </div>
            </div>
          </div>
          <div className="statsContainer">
            <div className="containerHeading">Patience</div>
            <div className="containerHeading">1.29 secs</div>
            <div className="containerSub">
              <div className="circle"></div>
              <div className="text">
                Within recommended range
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Stats