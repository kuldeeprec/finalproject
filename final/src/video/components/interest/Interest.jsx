import './interest.css'
import { Link } from "react-router-dom";

const Interest = () => {
    return (
        <div className='interestWrapper'>
            <div className='interestHeading'>
                <p>Video Content</p>
            </div>
            <div className="form-check mx-4 my-4" style={{"fontSize":"25px"}}>
            <label className="form-check-label" for="flexCheckDefault">
            <Link to="./recording"> Second Video </Link>
            </label>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
            <div className="form-check mx-4 my-4" style={{"fontSize":"25px"}}>
            <label className="form-check-label" for="flexCheckDefault">
            <Link to="./recording"> Third Video </Link>
            </label>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
            <div className="form-check mx-4 my-4" style={{"fontSize":"25px"}}>
            <label className="form-check-label" for="flexCheckDefault">
            <Link to="./recording"> Fourth Video </Link>
            </label>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
            <div className="form-check mx-4 my-4" style={{"fontSize":"25px"}}>
            <label className="form-check-label" for="flexCheckDefault">
            <Link to="./recording"> Fifth Video </Link>
            </label>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
            <div className="form-check mx-4 my-4" style={{"fontSize":"25px"}}>
            <label className="form-check-label" for="flexCheckDefault">
            <Link to="./recording"> Sixth Video </Link>
            </label>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
            <div className="form-check mx-4 my-4" style={{"fontSize":"25px"}}>
            <label className="form-check-label" for="flexCheckDefault">
            <Link to="./recording"> Seventh Video </Link>
            </label>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
            <div className="form-check mx-4 my-4" style={{"fontSize":"25px"}}>
            <label className="form-check-label" for="flexCheckDefault">
            <Link to="./recording"> Eighth Video </Link>
            </label>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
            <div className="form-check mx-4 my-4" style={{"fontSize":"25px"}}>
            <label className="form-check-label" for="flexCheckDefault">
            <Link to="./recording"> Ninth Video </Link>
            </label>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
        </div>
    )
}

export default Interest