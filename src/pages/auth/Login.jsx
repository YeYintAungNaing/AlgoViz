import { Link } from "react-router-dom";


export default function Login() {
  return (
    <div className="login-page">
    <div className="auth-container">
    <div className="login-form-container">
      <div className="login-form">
        <h1>Login</h1>
        <input placeholder="Name"></input> 
        <input placeholder="Password"></input>
        <Link className="link" to='/AlgoViz'><button className="submit-button">Login</button></Link>
        <Link className="link" to='/AlgoViz'><button className="gmail-button">Sign in with gmail account</button></Link>
      </div>
      <div className="login-info">
        <h2>Welcome To AlgoViz</h2>
        <span>Do not have an account?</span>
        <span>Click the button below to register instead</span>
        <Link className="link" to='/AlgoViz/register'><button className="submit-button">Register</button></Link>
      </div>         
    </div>
  </div>
  </div>
  )
}
