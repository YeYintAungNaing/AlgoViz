import { Link } from "react-router-dom"
//import Logo from '../imgs/Logo.png'

function NavBar() {
  return (
    <div className="navBar">
        <Link className='link' to="/AlgoViz">
          <h1>AlgoViz</h1>
        </Link>
      <div className="navLinks">
        <Link className='link' to='/AlgoViz'>Home</Link>
        <Link className='link' to='/AlgoViz/compare'>Compare</Link>
        <Link className="link" to='/AlgoViz/register'>
          <button className="submit-button">Login</button>
        </Link>
      </div>
    </div>
  )
}

export default NavBar