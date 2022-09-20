import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

function ConfirmService() {
	let data;
	const navigate = useNavigate();
	const location = useLocation();

	const [isLoading, setIsLoading] = useState(true);
	const [allServices, setAllServices] = useState();

	useEffect(() => {
		isLoggedIn();
		getServices().then(() => setIsLoading(false));
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

	let services = [];

	const getServices = async () => {
		let url = `${process.env.REACT_APP_API_URL}api/${auth.currentUser.uid}/appointments/${appointmentId}`;
		await fetch(url)
			.then((res) => res.text())
			.then((res) => {
				data = JSON.parse(res);
				setAllServices(data);
				console.log(data);
			});
	};

	if (isLoading) {
		return (
			<div className='dashContainer'>
				<div className='containerHeader'>Klean King</div>
				<h2>Loading...</h2>
			</div>
		);
	} else {
		let userId = allServices.userId;
		let serviceI = allServices.serviceId;
		let firstName = allServices.firstName;
		let lastName = allServices.lastName;
		let email = allServices.email;
		let phoneNumber = allServices.phoneNumber;
		let service = allServices.service;
		let date = allServices.date;
		let time = allServices.time;
		let street = allServices.street;
		let city = allServices.city;
		let state = allServices.state;
		let zipcode = allServices.zipcode;
		let moreInfo = allServices.moreInfo;
		return (
			<div className='dashContainer'>
				<div className='containerHeader'>Klean King</div>
				<div className='confirmPageDiv'>
					<p>
						Your service is scheduled! An email will be sent to you shortly with
						the details. Also if the time or date requested is unavailable we
						will notify you ASAP.
					</p>
					<h3>Service</h3>
					<p>{service}</p>
					<h3>When</h3>
					<p>
						{date} {time}
					</p>
					<h3>Address</h3>
					<p>{street}</p>
					<p>
						{city} {state}
					</p>
					<h3>Notes</h3>
					<p>{moreInfo}</p>
				</div>

				<div className='confirmService'></div>
				<button onClick={() => navigate('/dashboard')}>Dashboard</button>
			</div>
		);
	}
}

export default ConfirmService;
