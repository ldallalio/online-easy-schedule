import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

function ConfirmService() {
	const navigate = useNavigate();
	const location = useLocation();

	const [services, setServices] = useState([]);

	useEffect(() => {
		isLoggedIn();
		getServices();
	}, []);
	const auth = getAuth();

	const isLoggedIn = async () => {
		if (!auth.currentUser) {
			console.log('no user');
			navigate('/');
		} else {
			return;
		}
	};
	const appointmentId = location.state.serviceId;

	async function getServices() {
		let url = `/${auth.currentUser.uid}/appointments/${appointmentId}`;
		fetch(url).then((res) => {
			let text = res.text();
			// setServices(text);
			console.log(text);
		});
	}
	return (
		<div className='dashContainer'>
			<div className='containerHeader'>Klean King</div>
			{services.map((item) => (
				<h2 key={item.id}> {item.name} </h2>
			))}
			<button onClick={() => navigate('/dashboard')}>Dashboard</button>
		</div>
	);
}

export default ConfirmService;
