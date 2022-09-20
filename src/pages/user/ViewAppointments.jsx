import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function ViewAppointments() {
	const navigate = useNavigate();
	const getAllAppointments = async () => {
		fetch();
	};
	return (
		<div className='dashContainer'>
			<div className='containerHeader'>Klean King</div>
			<div className='viewAppointments'>
				<div className='appointmentCard'>
					<table>
						<thead>
							<td>Service</td>
							<td>When</td>
							<td>Where</td>
						</thead>
						<tbody>
							<tr>
								<td>Air Ducts</td>
								<td>10:00 AM</td>
								<td>123 Apple Street</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td>Vidalia, LA</td>
							</tr>
						</tbody>
					</table>
					<button>Cancel</button>
				</div>
			</div>
			<button onClick={() => navigate('/dashboard')}>Back</button>
		</div>
	);
}

export default ViewAppointments;
