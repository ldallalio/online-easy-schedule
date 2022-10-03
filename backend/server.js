const bodyparser = require("body-parser");
var express = require("express");
require("dotenv").config();
var app = express();
const nodemailer = require("nodemailer");
const port = process.env.PORT || 5000;
const path = require("path");
const ejs = require("ejs");
app.set("view engine", "ejs");
const cors = require("cors");
// const signUp = ;

const whitelist = [
	"http://localhost:3000",
	"http://localhost:5000",
	"https://kleankingeasyschedule.herokuapp.com",
	"https://online-easy-schedule-production.up.railway.app/",
];
console.log(process.env.REACT_APP_EMAIL_KEY);
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "logandallalio@gmail.com",
		pass: process.env.REACT_APP_EMAIL_KEY,
	},
});

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},

	credentials: true,
};

app.use(cors(corsOptions));

const { MongoClient, ServerApiVersion } = require("mongodb");
const { error } = require("console");
const { sign } = require("crypto");
const uri = process.env.MONGO_URI;

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.get("/preview", (req, res) => {
	res.render("email/signup.ejs");
});
//GET USER APPOINTMENTS
app.get("/api/:userId/appointments", (req, res) => {
	MongoClient.connect(uri).then((client) => {
		console.log("Getting Single Appointment From this place");
		try {
			const db = client.db("testDB");
			const col = db.collection("testCol");
			col.find({ userId: req.params.userId }).toArray(function (err, result) {
				if (err) throw err;
				res.send(result);
			});
		} catch {
			console.log("Error");
		}
	});
});
//GET SINGLE USER APPOINTMENT
app.get("/api/:userId/appointments/:appointmentId", (req, res) => {
	// res.send(req.params);
	let x;
	MongoClient.connect(uri).then((client) => {
		console.log("Getting Single Appointment From this place");
		try {
			const db = client.db("testDB");
			const col = db.collection("testCol");
			let appointment = col.findOne({
				serviceId: req.params.appointmentId,
			});
			appointment.then((i) => {
				x = i;
				res.send(x);
			});
		} catch {
			console.log("ERROR");
		}
		// database name

		// collection name
		// db.createCollection('testCol');
	});
});
//POST CREATE USER APPOINTMENTS
app.post(`/api/:userId/appointments`, function (req, res) {
	// console.log(res.json());
	let data = JSON.stringify(req.body);
	// console.log(data);
	res.send(data);
	//save info to database
	MongoClient.connect(uri)
		.then((client) => {
			console.log("Database Connected with API");

			// database name
			const db = client.db("testDB");

			// collection name
			// db.createCollection('testCol');
			db.collection("testCol").insertOne(JSON.parse(data));
		})
		.then(() => {
			ejs.renderFile(
				__dirname + "/views/email/signUp.ejs",
				function (err, data) {
					if (err) {
						console.log(err);
					} else {
						const mailOptions = {
							from: "logandallalio@gmail.com",
							to: "logan@dallalioweb.dev",
							subject: "Account Activated",
							html: data,
						};
						transporter.sendMail(mailOptions, function (error, info) {
							if (error) {
								console.log(error);
							} else {
								console.log("Email sent: " + info.response);
							}
						});
					}
				},
			);
		});
});
//DELETE USER APPOINTMENT
app.put("/api/:userId/appointments/:appointmentId", (req, res) => {
	console.log(req.body);
	let x;
	MongoClient.connect(uri).then((client) => {
		console.log("Getting Single Appointment From this place");
		try {
			const db = client.db("testDB");
			const col = db.collection("testCol");
			let appointment = col.deleteOne({
				serviceId: req.params.appointmentId,
			});
			appointment.then((i) => {
				x = i;
				res.send(x);
			});
		} catch {
			console.log("ERROR");
		}
		// database name

		// collection name
		// db.createCollection('testCol');
	});
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../build/index.html"));
	});
}

//SERVER
app.listen(port, () => {
	console.log("Server Started at --> " + `http://localhost:${port}`);
});
