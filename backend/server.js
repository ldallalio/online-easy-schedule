const bodyparser = require('body-parser');
const express = require('express');
require('dotenv').config();

const app = express();
const nodemailer = require('nodemailer');

const port = process.env.PORT || 5000;
const path = require('path');
const ejs = require('ejs');

app.use(express.static('public'));

app.set('view engine', 'ejs');
const cors = require('cors');
// const signUp = ;

const whitelist = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://kleankingeasyschedule.herokuapp.com',
  'https://online-easy-schedule-production.up.railway.app/',
];
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'logandallalio@gmail.com',
    pass: process.env.REACT_APP_EMAIL_KEY,
  },
});

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

const { MongoClient, ServerApiVersion } = require('mongodb');
const { error } = require('console');
const { sign } = require('crypto');
const { json } = require('body-parser');

const uri = process.env.MONGO_URI;

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.get('/preview', (req, res) => {
  res.render('email/cancel.ejs', { name: 'Logan' });
});

// ? Users

// Creating Single User
app.post('/api/:userId', (req, res) => {
  const data = req.body;
  console.log('🚀 ~ file: server.js:65 ~ app.post ~ data', data);
  const {
    uid, firstname, lastname, email, phoneNumber,
  } = data;
  // save info to database
  MongoClient.connect(uri)
    .then((client) => {
      console.log('Database Connected with API');

      // database name
      const db = client.db('onlineScheduleDB');

      // collection name
      // db.createCollection('testCol');
      db.collection('users').insertOne(data);
    })
    .then(() => {
      // ejs.renderFile(
      //   `${__dirname}/views/email/signup.ejs`,
      //   {
      //     data: JSON.parse(data),
      //   },
      //   (err, ejsData) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       const mailOptions = {
      //         from: 'logandallalio@gmail.com',
      //         to: 'logan@dallalioweb.dev',
      //         subject: 'Appointment Confirmed',
      //         html: ejsData,
      //       };
      //       transporter.sendMail(mailOptions, (error, info) => {
      //         if (error) {
      //           console.log(error);
      //         } else {
      //           console.log(`Email sent: ${info.response}`);
      //         }
      //       });
      //     }
      //   },
      // );
    });
});

// GET USER APPOINTMENTS
app.get('/api/:userId/appointments', (req, res) => {
  MongoClient.connect(uri).then((client) => {
    console.log('Getting Single Appointment From this place');
    try {
      const db = client.db('onlineScheduleDB');
      const col = db.collection('appointments');
      col.find({ userId: req.params.userId }).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch {
      console.log('Error');
    }
  });
});
// GET SINGLE USER APPOINTMENT
app.get('/api/:userId/appointments/:appointmentId', (req, res) => {
  // res.send(req.params);
  MongoClient.connect(uri).then((client) => {
    console.log('Getting Single Appointment From this place');
    try {
      const db = client.db('onlineScheduleDB');
      const col = db.collection('appointments');
      const appointment = col.findOne({
        serviceId: req.params.appointmentId,
      });
      appointment.then((i) => {
        x = i;
        res.send(x);
      });
    } catch {
      console.log('ERROR');
    }
    // database name

    // collection name
    // db.createCollection('testCol');
  });
});
// POST CREATE USER APPOINTMENTS
app.post('/api/:userId/appointments', (req, res) => {
  // console.log(res.json());
  const data = JSON.stringify(req.body);
  res.send(data);
  const myData = JSON.stringify(data);

  const {
    firstName, lastName, street, state, city, zipcode, time, service,
  } = data;
  // save info to database
  MongoClient.connect(uri)
    .then((client) => {
      console.log('Database Connected with API');

      // database name
      const db = client.db('onlineScheduleDB');

      // collection name
      // db.createCollection('testCol');
      db.collection('appointments').insertOne(JSON.parse(data));
    })
    .then(() => {
      ejs.renderFile(
        `${__dirname}/views/email/signup.ejs`,
        {
          data: JSON.parse(data),
        },
        (err, ejsData) => {
          if (err) {
            console.log(err);
          } else {
            const mailOptions = {
              from: 'logandallalio@gmail.com',
              to: 'logan@dallalioweb.dev',
              subject: 'Appointment Confirmed',
              html: ejsData,
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log(`Email sent: ${info.response}`);
              }
            });
          }
        },
      );
    });
});
// DELETE USER APPOINTMENT
app.put('/api/:userId/appointments/:appointmentId', (req, res) => {
  console.log(req.body);
  let x;
  MongoClient.connect(uri).then((client) => {
    console.log('Getting Single Appointment From this place');
    try {
      const db = client.db('onlineScheduleDB');
      const col = db.collection('appointments');
      const appointment = col.deleteOne({
        serviceId: req.params.appointmentId,
      });
      appointment.then((i) => {
        x = i;
        res.send(x);
      })
        .then(() => {
          ejs.renderFile(
            `${__dirname}/views/email/cancel.ejs`,
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                const mailOptions = {
                  from: 'logandallalio@gmail.com',
                  to: 'logan@dallalioweb.dev',
                  subject: 'Appointment Cancelled',
                  html: data,
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(`Email sent: ${info.response}`);
                  }
                });
              }
            },
          );
        });
    } catch {
      console.log('ERROR');
    }
    // database name

    // collection name
    // db.createCollection('testCol');
  });
});

// ? Admin Section

// Get Single Admin
app.get('/api/admin/:userId', async (req, res) => {
  const myUser = req.params.userId;

  const checkingUser = async () => (MongoClient.connect(uri).then(async (client) => {
    try {
      const db = client.db('onlineScheduleDB');
      const col = db.collection('users');
      const user = col.findOne({
        uid: myUser,
      });
      return user;
    } catch {
      console.log('ERROR');
    }
  }));
  res.send(await checkingUser());
  // console.log(await checkingUser())
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}

// SERVER
app.listen(port, () => {
  console.log('Server Started at --> ' + `http://localhost:${port}`);
});
