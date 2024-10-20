import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/AlgoViz')
    } catch (error) {
      //console.error("Error signing in: ", error);
      window.alert("Incorrect info")
    }
  };

  return (
    <div className="login-page">
    <div className="auth-container">
    <div className="login-form-container">
      <div className="login-form">
        <h1>Login</h1>
        <input
        type="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
        <button onClick={handleSignIn} className="submit-button">Login</button>
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
