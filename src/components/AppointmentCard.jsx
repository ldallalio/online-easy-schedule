import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import UserContext from "../context/UserContext";
function AppointmentCard() {
	const navigate = useNavigate();
	let data;
	const [isLoading, setIsLoading] = useState(true);
	const [allServices, setAllServices] = useState([]);
	const { serviceOptions, setServiceOptions, isLoggedIn } =
		useContext(UserContext);
	const auth = getAuth();
	const userId = auth.currentUser.uid;
	useEffect(() => {
		getServices()
			.then((res) => {
				setAllServices(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const sendData = async (id) => {
		console.log(userId);
		const url = `${process.env.REACT_APP_API_URL}api/${userId}/appointments/${id}`;
		// post body data

		// request options
		const options = {
			method: "PUT",
			body: JSON.stringify(await { id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		};
		// send POST request
		await fetch(url, options)
			.then((res) => res.text())
			.then((res) => {
				return;
			});
	};

	const getServices = async () => {
		let url = `${process.env.REACT_APP_API_URL}api/${auth.currentUser.uid}/appointments/`;
		await fetch(url)
			.then((res) => res.text())
			.then((res) => {
				data = JSON.parse(res);
			});
		setIsLoading(false);
		return data;
	};
	const deleteService = async (e) => {
		let id = e.target.attributes[0].value;
		// console.log(id);
		setIsLoading(true);
		await sendData(await id);
		navigate("/dashboard");
	};
	if (isLoading) {
		return (
			<div className='dashContainer'>
				<h2>Loading...</h2>
			</div>
		);
	} else {
		// return <h1>Hello World</h1>;
		return allServices.map((i) => {
			let id = i.serviceId;
			return (
				<div className='appointmentCard'>
					<table>
						<thead>
							<td>Service</td>
							<td>When</td>
							<td>Where</td>
						</thead>
						<tbody>
							<tr>
								<td>{i.service}</td>
								<td>{i.time}</td>
								<td>{i.street}</td>
							</tr>
							<tr>
								<td></td>
								<td>{i.date}</td>
								<td>
									{i.city}, {i.state}
								</td>
							</tr>
						</tbody>
					</table>
					<button onClick={deleteService} data-service-id={id}>
						Cancel
					</button>
				</div>
			);
		});
	}
}

export default AppointmentCard;
