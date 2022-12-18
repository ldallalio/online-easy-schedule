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

    }
  };
  const appointmentId = location.state.serviceId;

  const services = [];

  const getServices = async () => {
    const url = `${process.env.REACT_APP_API_URL}api/${auth.currentUser.uid}/appointments/${appointmentId}`;
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
      <div className="dashContainer">
        <div className="containerHeader">Klean King</div>
        <h2>Loading...</h2>
      </div>
    );
  }
  const { userId } = allServices;
  const serviceI = allServices.serviceId;
  const { firstName } = allServices;
  const { lastName } = allServices;
  const { email } = allServices;
  const { phoneNumber } = allServices;
  const { service } = allServices;
  const { date } = allServices;
  const { time } = allServices;
  const { street } = allServices;
  const { city } = allServices;
  const { state } = allServices;
  const { zipcode } = allServices;
  const { moreInfo } = allServices;
  return (
    <div className="dashContainer">
      <div className="containerHeader">Klean King</div>
      <div className="confirmPageDiv">
        <p>
          Your service is scheduled! An email will be sent to you shortly with
          the details. Also if the time or date requested is unavailable we
          will notify you ASAP.
        </p>
        <h3>Service</h3>
        <p>{service}</p>
        <h3>When</h3>
        <p>
          {date}
          {' '}
          {time}
        </p>
        <h3>Address</h3>
        <p>{street}</p>
        <p>
          {city}
          {' '}
          {state}
        </p>
        <h3>Notes</h3>
        <p>{moreInfo}</p>
      </div>

      <div className="confirmService" />
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
    </div>
  );
}

export default ConfirmService;
