import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/user/SignUp';
import UserDashboard from './pages/user/UserDashboard';
import ChooseService from './pages/user/ChooseService';
import ConfirmService from './pages/user/ConfirmService';
import ViewAppointments from './pages/user/ViewAppointments';
import { UserProvider } from './context/UserContext';

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/dashboard" element={<UserDashboard />} />
					<Route path="/choose-service" element={<ChooseService />} />
					<Route path="/book-service" element={<ConfirmService />} />
					<Route path="/user/appointments" element={<ViewAppointments />} />
				</Routes>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
