import './transcript.css'

const Transcript = (props) => {
  return (
    <div className='transcriptWrapper'>
        <div className="transcriptHead">Transcripted Conversation:</div>
        <div className="transcriptTexts">
            <div className={((props.isNav.openInterest || props.isNav.openInteraction || props.isNav.openCompany || props.isNav.openSlides) ?"transcriptTexts_speaker2" : "transcriptTexts_speaker")}>
                <img src="https://img.icons8.com/ios/18/3F51B5/ringer-volume.png" alt="call" />
                <div className='transcriptedTextAreaSpeaker'/>
            </div>
            <div className={((props.isNav.openInterest || props.isNav.openInteraction || props.isNav.openCompany || props.isNav.openSlides) ?"transcriptTexts_listener2" : "transcriptTexts_listener")}>
                <div className='transcriptedTextAreaListener'/>
                <img src="https://img.icons8.com/ios/18/3F51B5/ringer-volume.png" alt="call" />
            </div>
            <div className={((props.isNav.openInterest || props.isNav.openInteraction || props.isNav.openCompany || props.isNav.openSlides) ?"transcriptTexts_speaker2" : "transcriptTexts_speaker")}>
                <img src="https://img.icons8.com/ios/18/3F51B5/ringer-volume.png" alt="call" />
                <div className='transcriptedTextAreaSpeaker'/>
            </div>
            <div className={((props.isNav.openInterest || props.isNav.openInteraction || props.isNav.openCompany || props.isNav.openSlides) ?"transcriptTexts_listener2" : "transcriptTexts_listener")}>
                <div className='transcriptedTextAreaListener'/>
                <img src="https://img.icons8.com/ios/18/3F51B5/ringer-volume.png" alt="call" />
            </div>
            <div className={((props.isNav.openInterest || props.isNav.openInteraction || props.isNav.openCompany || props.isNav.openSlides) ?"transcriptTexts_speaker2" : "transcriptTexts_speaker")}>
                <img src="https://img.icons8.com/ios/18/3F51B5/ringer-volume.png" alt="call" />
                <div className='transcriptedTextAreaSpeaker'/>
            </div>
            <div className={((props.isNav.openInterest || props.isNav.openInteraction || props.isNav.openCompany || props.isNav.openSlides) ?"transcriptTexts_listener2" : "transcriptTexts_listener")}>
                <div className='transcriptedTextAreaListener'/>
                <img src="https://img.icons8.com/ios/18/3F51B5/ringer-volume.png" alt="call" />
            </div>
        </div>
        <div className="line"></div>
        <div className="callSummaryWrapper">
            <div className="transcriptHead">Last Call Summary</div>
            <div className='summary'>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium rem architecto ratione nam animi pariatur neque dolores, ea explicabo quod laboriosam vero ab officiis aliquam qui, enim iusto. Veritatis cumque ad modi eos deleniti culpa molestiae adipisci esse voluptates autem."</div>
        </div>
    </div>
  )
}

export default Transcript