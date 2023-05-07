import './navbar.css'
import logo2 from '../../assets/logo2.png'
import {Link} from 'react-router-dom'
const Navbar = (props) => {

    return (
        <div className='navbarContainer'>
            <div className="navLogo">
                <img src={logo2} alt="logo" width={120} />
            </div>
            <ul className="navLinks">
                <li><Link to ="/" className={props.type === 'home' ? 'active' : null} >HOME</Link></li>
                <li><Link to="/recording" className={props.type === 'recording'  ? 'active' : null}>VIDEOS</Link></li>
                <li><Link to="/maketeam" className={props.type === 'calls'  ? 'active' : null}>MAKETEAM</Link></li>
                <li><Link to="/deals" className={props.type === 'deals' ? 'active' : null}>SHOPPING CART</Link></li>
                <li><Link to="/status" className={props.type === 'teams' ? 'active' : null}>STATUS</Link></li>
                {/* <li><Link to="/activity" className={props.type === 'activity' ? 'active' : null}>ACTIVITY</Link></li>
                <li><Link to="/library" className={props.type === 'library'  ? 'active' : null}>LIBRARY</Link></li> */}
            </ul>
            <div className='navSearch'>
                <input type="text" placeholder='Search' className='navInput' />
                <img src="https://img.icons8.com/ios-filled/24/ffffff/search--v1.png" alt="search" />
            </div>
            <ul className='navLinks'>
                <li><Link to="/account">MY ACCOUNT</Link></li>
            </ul>
            <div className="navHelp">
                <img src="https://img.icons8.com/ios-glyphs/35/ffffff/help.png" alt='img' />
            </div>
        </div>
    )
}

export default Navbar