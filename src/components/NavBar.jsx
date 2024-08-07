import { Link } from "react-router-dom"
import Logo from '../imgs/Logo.png'

function NavBar() {
  return (
    <div className="navBar">
      <div className="Logo">
        <Link className='link' to="/AlgoViz">
          <img src={Logo} alt=""></img>
        </Link>
      </div>
      <div className="navLinks">
        <Link className='link' to='/AlgoViz'>Home</Link>
        <Link className='link' to='/AlgoViz/contact'>Contact us</Link>
        <Link className='link' to='/AlgoViz/documentation'>Documentation</Link>
      </div>
    </div>
  )
}

export default NavBar