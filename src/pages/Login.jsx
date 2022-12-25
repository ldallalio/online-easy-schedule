import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../auth/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
function Login() {
  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  const logInWithEmailAndPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    logInWithEmailAndPassword();
  };

  return (
    <div className="loginContainer">
      <div className="loginHeader">Online Scheduler</div>
      <div className="loginForm">
        <form>
          <input
            placeholder="Enter Email..."
            type="email"
            className="loginEmail"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
          <input
            placeholder="Enter Password..."
            type="password"
            name="password"
            id=""
            className="loginPassword"
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button className="loginSubmit" onClick={onSubmit}>
            LOGIN
          </button>
          <button
            onClick={(e) => navigate('/sign-up')}
            className="loginSignUp"
          >
            SIGN-UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
