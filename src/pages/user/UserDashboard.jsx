import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

function UserDashboard() {
	const navigate = useNavigate();
	useEffect(() => {
		isLoggedIn();
	});
	const auth = getAuth();
	const isLoggedIn = async () => {
		if (!auth.currentUser) {
			console.log('no user');
			navigate('/');
		} else {
			console.log('Logged In');
		}
	};

	return (
		<div className='dashContainer'>
			<div className='containerHeader'>Klean King Carpet</div>
			<button onClick={(e) => navigate('/choose-service')}>
				Book Appointment
			</button>
			<button>View Appointments</button>
			<button
				onClick={(e) => {
					signOut(auth)
						.then(() => {
							// Sign-out successful.
							navigate('/');
						})
						.catch((error) => {
							alert(error);
						});
				}}>
				LOGOUT
			</button>
		</div>
	);
}

export default UserDashboard;
