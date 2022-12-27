/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import UserContext from '../context/UserContext';

function AppointmentCard() {
  const navigate = useNavigate();
  let data;
  const [isLoading, setIsLoading] = useState(true);
  const [allServices, setAllServices] = useState([]);
  const [haveAppointments, setHaveAppointments] = useState(false);
  const { serviceOptions, setServiceOptions, isLoggedIn } =		useContext(UserContext);
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  useEffect(() => {
    getServices()
      .then((res) => {
		  if (res.length > 0) {
          setHaveAppointments(true);
        }
        setAllServices(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);
  const sendData = async (id) => {
    console.log(userId);
    const url = `${process.env.REACT_APP_API_URL}api/${userId}/appointments/${id}`;
    // post body data

    // request options
    const options = {
      method: 'GET',
      body: JSON.stringify(await { id }),
      headers: {
        'content-type': 'application/json',
      },
    };
    // send POST request
    await fetch(url, options)
      .then((res) => res.text())
      .then((res) => {

      });
  };
  const deleteData = async (id) => {
    console.log(userId);
    const url = `${process.env.REACT_APP_API_URL}api/${userId}/appointments/${id}`;
    // post body data

    // request options
    const options = {
      method: 'PUT',
      body: JSON.stringify(await { id }),
      headers: {
        'content-type': 'application/json',
      },
    };
    // send POST request
    await fetch(url, options)
      .then((res) => res.text())
      .then((res) => {

      });
  };

  const getServices = async () => {
    const url = `${process.env.REACT_APP_API_URL}api/${auth.currentUser.uid}/appointments`;
    await fetch(url)
      .then((res) => res.text())
      .then((res) => {
        data = JSON.parse(res);
      });
    setIsLoading(false);
    return data;
  };
  const deleteService = async (e) => {
    const id = e.target.attributes[0].value;
    // console.log(id);
    setIsLoading(true);
    await deleteData(await id);
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="dashContainer">
        <h2>Loading...</h2>
      </div>
    );
  }
  if (haveAppointments) {
	  return allServices.map((i) => {
	  const id = i.serviceId;
	  return (
  <div className="appointmentCard">
    <div className="cardContent">

      <div className="grid-item bold">Service</div>
      <div className="grid-item bold">When</div>
      <div className="grid-item bold">Where</div>
      <div className="grid-item">{i.service}</div>
      <div className="grid-item">{i.date}</div>
      <div className="grid-item">{i.city }</div>
      <div className="grid-item" />
      <div className="grid-item">{ i.time}</div>
      <div className="grid-item">{i.state }</div>
    </div>
    <button onClick={deleteService} data-service-id={id}>
      Cancel
    </button>
  </div>
	  );
    });
  }
  if (!haveAppointments) {
	  return (
  <div className="AppointmentCard">No Appointments</div>
	  );
  }
}

export default AppointmentCard;
