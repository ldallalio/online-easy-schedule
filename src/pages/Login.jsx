import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../auth/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
function Login() {
  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const sendData = async (id) => {
    console.log(userId);
    const url = `${process.env.REACT_APP_API_URL}api/${userId}/appointments/${id}`;
    // post body data

    // request options
    const options = {
      method: 'GET',
      body: JSON.stringify(await { id }),
      headers: {
        'content-type': 'application/json',
      },
    };
    // send POST request
    await fetch(url, options)
      .then((res) => res.text())
      .then((res) => {

      });
  };

  const logInWithEmailAndPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      const userId = auth.currentUser.uid;
      if (userId) {
        console.log('blah blah blah');
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await logInWithEmailAndPassword();
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
