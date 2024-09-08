import { Link } from "react-router-dom"

function Register() {
  return (
    <div className="register-page">
    <div className="auth-container">
    <div className="register-form-container">
      <div className="register-form">
        <h1>Create Account</h1>
        <input  placeholder="Email"></input>
        <input placeholder="Name"></input>
        <input placeholder="Password"></input>
        <input placeholder="Comfirm password"></input>
        <Link className="link"  to='/AlgoViz'><button className="submit-button">Register</button></Link>
        <Link className="link"  to='/AlgoViz'><button className="gmail-button">Sign in as a guest user</button></Link>
      </div>
      <div className="register-info">
        <h2>Welcome To AlgoViz</h2>
        <span>Register to use fully enjoy the website features</span>
        <span>Click the button below to sign in instead</span>
        <Link className="link"  to='/AlgoViz/login'><button className="submit-button">Sign in</button></Link> 
      </div>         
    </div>
  </div>
  </div>
  )
}

export default Register