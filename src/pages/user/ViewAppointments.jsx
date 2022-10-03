import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Card from "../../components/AppointmentCard";
function ViewAppointments() {
	const navigate = useNavigate();
	useEffect(() => {
		isLoggedIn();
	}, []);
	const auth = getAuth();

	const isLoggedIn = async () => {
		if (!auth.currentUser) {
			console.log("no user");
			navigate("/");
		} else {
			return;
		}
	};

	return (
		<div className='dashContainer'>
			<div className='containerHeader'>Klean King</div>
			<div className='viewAppointments'>
				<Card />
			</div>
			<button onClick={() => navigate("/dashboard")}>Back</button>
		</div>
	);
}

export default ViewAppointments;
