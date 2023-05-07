import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import moment from 'moment'

import './activity.css'

const Activity = () => {
  const date = moment().format('LL')
  return (
    <div className='activityApp'>
      <Navbar type = 'activity' />
      <div className="activityAppWrapper">
        <div className="activityAppWrapperHeader">
          <div className="activityAppWrapperHeading">Activity</div>
          <div className="activityAppWrapperHeaderGap"></div>
          <div className="activityAppWrapperDate">{date}</div>
        </div>
        <div className="activityAppWrapperBody">
          <div className="activityAppWrapperBodyPart1">
            <div className="activityAppWrapperBodyName">Name</div>
          </div>
          <div className="activityAppWrapperBodyPart2">
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
          </div>
        </div>
        <div className="activityAppWrapperBody">
          <div className="activityAppWrapperBodyPart1">
            <div className="activityAppWrapperBodyName">Name</div>
          </div>
          <div className="activityAppWrapperBodyPart2">
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
          </div>
        </div>
        <div className="activityAppWrapperBody">
          <div className="activityAppWrapperBodyPart1">
            <div className="activityAppWrapperBodyName">Name</div>
          </div>
          <div className="activityAppWrapperBodyPart2">
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
          </div>
        </div>
        <div className="activityAppWrapperBody">
          <div className="activityAppWrapperBodyPart1">
            <div className="activityAppWrapperBodyName">Name</div>
          </div>
          <div className="activityAppWrapperBodyPart2">
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
          </div>
        </div>
        <div className="activityAppWrapperBody">
          <div className="activityAppWrapperBodyPart1">
            <div className="activityAppWrapperBodyName">Name</div>
          </div>
          <div className="activityAppWrapperBodyPart2">
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
          </div>
        </div>
        <div className="activityAppWrapperBody">
          <div className="activityAppWrapperBodyPart1">
            <div className="activityAppWrapperBodyName">Name</div>
          </div>
          <div className="activityAppWrapperBodyPart2">
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
            <div className="activityAppWrapperBodyPart2line"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity