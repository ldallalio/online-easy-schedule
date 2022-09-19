import React, { useState } from 'react';
import '../../auth/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

function SignUp() {
	const navigate = useNavigate();
	const [pass, setPass] = useState('');
	const [email, setEmail] = useState('');
	const onSubmit = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, pass)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				navigate('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
				// ..
			});
	};
	return (
		<>
			<div className='loginContainer'>
				<div className='loginHeader'>Sign-Up</div>
				<div className='loginForm'>
					<form>
						<input
							placeholder='Enter Email...'
							type='email'
							className='loginEmail'
							required
							onChange={(e) => setEmail(e.target.value)}
							name='email'
						/>
						<input
							placeholder='Enter Password...'
							type='password'
							name='password'
							id=''
							className='loginPassword'
							required
							onChange={(e) => setPass(e.target.value)}
						/>
						<button type='submit' className='loginSubmit' onClick={onSubmit}>
							SUBMIT
						</button>
						<a onClick={(e) => navigate('/')} className='loginSignUp'>
							Back
						</a>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignUp;
