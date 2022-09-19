import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import UserContext from '../../context/UserContext';
import { v4 as uuidv4 } from 'uuid';

function ChooseService() {
	const navigate = useNavigate();
	const auth = getAuth();
	const [serviceId, setServiceId] = useState('noserviceID');
	useEffect(() => {
		setServiceId(uuidv4());
		isLoggedIn();
	}, []);
	const { serviceOptions, setServiceOptions, isLoggedIn, userId } =
		useContext(UserContext);
	let userService, userTime, userDate;

	const sendData = async (details) => {
		const url = `${process.env.REACT_APP_API_URL}api/${userId}/appointments`;
		// post body data

		// request options
		const options = {
			method: 'POST',
			body: JSON.stringify(await details),
			headers: {
				'Content-Type': 'application/json',
			},
		};
		// send POST request
		await fetch(url, options)
			.then((res) => res.text())
			.then((res) => {
				return;
			});
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		let form = document.getElementById('chooseService');
		let formData = new FormData(form);
		let formIDs = {
			firstName: formData.get('firstName'),
			lastName: formData.get('lastName'),
			email: formData.get('email'),
			phoneNumber: formData.get('phoneNumber'),
			service: formData.get('service'),
			date: formData.get('date'),
			time: formData.get('time'),
			street: formData.get('street'),
			city: formData.get('city'),
			state: formData.get('state'),
			zipcode: formData.get('zipcode'),
			moreInfo: document.getElementsByTagName('textarea')[0].value,
			userId: userId,
			serviceId: serviceId,
		};
		const checkValues = async () => {
			let sum = 0;
			Object.values(formIDs).forEach((Id) => {
				if (Id) {
					return;
				} else {
					sum += 1;
				}
			});
			// if (sum > 0) {
			// 	alert('PLEASE FILL OUT ALL FIELDS');
			// } else {
			await sendData(formIDs);
			// }
		};
		await checkValues();

		//Save to Database
		navigate('/book-service', { state: { serviceId: serviceId } });
	};

	const nextClick = (e) => {
		e.preventDefault();

		let id = e.target.id;
		if (+id === 1) {
			document.getElementsByTagName('div')[3].classList.add('hidden');
			document.getElementsByTagName('div')[4].classList.remove('hidden');
		} else if (+id === 2) {
			document.getElementsByTagName('div')[4].classList.add('hidden');
			document.getElementsByTagName('div')[5].classList.remove('hidden');
		} else if (+id === 3) {
			document.getElementsByTagName('div')[5].classList.add('hidden');
			document.getElementsByTagName('div')[3].classList.remove('hidden');
		}
	};

	return (
		<div className='dashContainer'>
			<div className='containerHeader'>Klean King</div>
			<form id='chooseService'>
				<div className='formSection1'>
					<input
						type='text'
						name='firstName'
						id='firstName'
						placeholder='First Name'
					/>
					<input
						type='text'
						name='lastName'
						id='lastName'
						placeholder='Last Name'
					/>
					<input
						type='tel'
						name='phoneNumber'
						placeholder='Phone Number'
						id='phoneNumber'
					/>
					<input type='email' name='email' id='email' placeholder='Email' />
					<button onClick={nextClick} id={1}>
						Next
					</button>
					<button onClick={() => navigate('/dashboard')}>Back</button>
				</div>
				<div className='formSection2 hidden'>
					<select
						name='service'
						id='service'
						placeholder='Select Service'
						onChange={(e) => (userService = e.target.value)}>
						<option value='null'>Select Service...</option>
						<option value='AirDucts'>Air Ducts</option>
						<option value='CarpetCleaning'>Carpet Cleaning</option>
						<option value='Rugs'>Rugs</option>
						<option value='Hardwood'>Hardwood</option>
					</select>
					<input
						type='date'
						name='date'
						id='date'
						onChange={(e) => (userDate = e.target.value)}
					/>
					<select
						name='time'
						id='time'
						placeholder='Select Time...'
						onChange={(e) => (userTime = e.target.value)}>
						<option value='null'>Select Time...</option>
						<option value='TEST'>9:00 AM</option>
						<option value='TEST'>10:00 AM</option>
						<option value='TEST'>11:00 AM</option>
						<option value='TEST'>12:00 PM</option>
					</select>
					<button onClick={nextClick} id={2}>
						Next
					</button>
					<button>Back</button>
				</div>
				<div className='formSection3 hidden'>
					<input
						type='text'
						name='street'
						id='street'
						placeholder='Street Address...'
					/>
					<input type='text' name='city' id='city' placeholder='City...' />
					<input type='text' name='state' id='state' placeholder='State...' />
					<input
						type='text'
						name='zipcode'
						id='zipcode'
						placeholder='Zipcode...'
					/>
					<textarea
						name=''
						id='moreInfo'
						cols='45'
						rows='5'
						placeholder='Please enter how many Rugs | Rooms | Ducts and any other additional information you would like to share...'></textarea>
					<button onClick={onSubmit}>Submit</button>
					<button onClick={nextClick} id='3'>
						Back
					</button>
				</div>
			</form>
		</div>
	);
}

export default ChooseService;
