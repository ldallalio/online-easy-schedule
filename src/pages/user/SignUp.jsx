import React, { useState } from 'react';
import '../../auth/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

function SignUp() {
  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const onSubmit = async (e) => {
	  e.preventDefault();

    createUserWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        // Signed in
        const { user } = userCredential;
    	// ?
        const newUser = {
          uid: user.uid,
          firstname,
          lastname,
          email,
          phoneNumber,
        };

		  const sendData = async () => {
			  const url = `${process.env.REACT_APP_API_URL}api/${newUser.uid}`;
			   // request options
          const options = {
            method: 'POST',
            body: JSON.stringify(await newUser),
            headers: {
              'Content-Type': 'application/json',
            },
		  };

			   // send POST request
          await fetch(url, options)
            .then((res) => res.text())
            .then((res) => {

            });
		  };
        await sendData();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
    navigate('/');
  };
  return (
    <div className="loginContainer">
      <div className="loginHeader">Sign-Up</div>
      <div className="loginForm">
        <form>
          <input
            placeholder="First Name"
            type="firstname"
            className="loginEmail"
            required
            onChange={(e) => setFirstname(e.target.value)}
            name="firstname"
          />
          <input
            placeholder="Last Name"
            type="firstname"
            className="loginEmail"
            required
            onChange={(e) => setLastname(e.target.value)}
            name="lastname"
          />
          <input
            placeholder="Phone Number"
            type="phonenumber"
            className="loginEmail"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            name="phonenumber"
          />
          <input
            placeholder="Enter Email..."
            type="email"
            className="loginEmail"
            required
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <input
            placeholder="Enter Password..."
            type="password"
            name="password"
            id=""
            className="loginPassword"
            required
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit" className="loginSubmit" onClick={onSubmit}>
            SUBMIT
          </button>
          <a onClick={(e) => navigate('/')} className="loginSignUp">
            Back
          </a>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
