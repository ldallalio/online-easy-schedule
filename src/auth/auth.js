// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API,
	authDomain: 'online-easy-schedule.firebaseapp.com',
	projectId: 'online-easy-schedule',
	storageBucket: 'online-easy-schedule.appspot.com',
	messagingSenderId: '1016269265270',
	appId: '1:1016269265270:web:d96bb8b4506ce16b5ac257',
	measurementId: 'G-SMTNET35GR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
