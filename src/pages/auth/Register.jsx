import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth, db } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore";

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername]   = useState('')
  const navigate = useNavigate();


  async function register(e){
    e.preventDefault()
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;  // this is to get the id that is automatically generated when a user register
        await setDoc(doc(db, "users", user.uid), {  //  setDoc is used since I am manually setting the document id the same as the one above
            userName: username,
            email: user.email
          });
          console.log('register sucess')
        navigate('/AlgoViz')
    }
    catch(e){
        console.error(e)
    }  
  } 


  return (
    <div className="register-page">
    <div className="auth-container">
    <div className="register-form-container">
      <div className="register-form">
        <h1>Create Account</h1>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={register} className="submit-button">Register</button>
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