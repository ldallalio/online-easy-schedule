const bodyparser = require('body-parser');
var express = require('express');
require('dotenv').config();
var app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');

const whitelist = ['http://localhost:3000', 'http://localhost:5000'];

const corsOptions = {
	origin: function (origin, callback) {
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
const uri = process.env.MONGO_URI;

MongoClient.connect(uri).then((client) => {
	console.log('Database created');

	// database name
	const db = client.db('testDB');

	// collection name
	// db.createCollection('testCol');
	// db.collection('testCol').insertOne({
	// 	name: 'Shelbie',
	// 	service: 'test',
	// });
});

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//GET USER APPOINTMENTS
app.get('/api/:userId/appointments', (req, res) => {
	res.send(req.params);
});
//GET SINGLE USER APPOINTMENTS
app.get('/api/:userId/appointments/:appointmentId', (req, res) => {
	res.send('Getting Single Appointment');
});
//POST CREATE USER APPOINTMENTS
app.post(`/api/:userId/appointments`, function (req, res) {
	// console.log(res.json());
	let data = JSON.stringify(req.body);
	// console.log(data);
	res.send(data);
	//save info to database
	// MongoClient.connect(uri).then((client) => {
	// 	console.log('Database created');

	// 	// database name
	// 	const db = client.db('testDB');

	// 	// collection name
	// 	// db.createCollection('testCol');
	// 	// db.collection('testCol').insertOne({
	// 	// 	userId,
	// 	// 	serviceID,
	// 	// 	serviceName,
	// 	// });
	// });
});
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/index.html'));
	});
}
//SERVER
app.listen(port, () => {
	console.log('Server Started at --> ' + `http://localhost:${port}`);
});
