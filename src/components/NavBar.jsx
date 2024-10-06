import { Link } from "react-router-dom"
import { GlobalContext } from "../context/GlobalState"
import { useContext } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase-config"
//import Logo from '../imgs/Logo.png'

function NavBar() {

  const {currentUser} = useContext(GlobalContext)

  async function logOut() {
    try{
        await signOut(auth)
        window.alert('sign out')
    }
    catch(e){
        console.error(e)
    }
}

  return (
    <div className="navBar">
        <Link className='link' to="/AlgoViz">
          <h1>AlgoViz</h1>
        </Link>
      <div className="navLinks">
        <Link className='link' to='/AlgoViz'>Home</Link>
        <Link className='link' to='/AlgoViz/compare'>Compare</Link>
        <Link className='link' to='/AlgoViz/discussion'>Discussion</Link>
        {
          currentUser? (
              <button onClick={logOut} className="submit-button">Logout</button>           
          ) : (
            <Link className="link" to='/AlgoViz/register'>
              <button className="submit-button">Login</button>
            </Link>
          )
        }    
      </div>
    </div>
  )
}

export default NavBar