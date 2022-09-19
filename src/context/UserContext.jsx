import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const auth = getAuth();
const UserContext = createContext();

export const UserProvider = ({ children }) => {
	// useEffect(() => {
	// }, []);
	const [serviceOptions, setServiceOptions] = useState({
		service: 'Please Select',
		date: 'Please Select',
		time: 'Please Select',
		address: 'Please Select',
	});
	const [userId, setUserId] = useState('NoID');
	const navigate = useNavigate();
	const getUserId = async () => {
		if (auth.currentUser) {
			setUserId(auth.currentUser.uid);
			// console.log(userId);
		}
	};
	const isLoggedIn = async () => {
		await getUserId();
		if (!auth.currentUser) {
			console.log('no user');
			navigate('/');
		} else {
			setUserId(auth.currentUser.uid);
			// console.log('User ID ---->  ' + userId);
		}
	};

	return (
		<UserContext.Provider
			value={{
				isLoggedIn,
				serviceOptions,
				setServiceOptions,
				userId,
				setUserId,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
