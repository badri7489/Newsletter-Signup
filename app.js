const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
	const first_name = req.body.first_name;
	const last_name = req.body.last_name;
	const email = req.body.email;
	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: first_name,
					LNAME: last_name,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);

	const url = "https://us17.api.mailchimp.com/3.0/lists/a26566755d";

	const options = {
		method: "POST",
		auth: "badri7489:56c6592d8ce29e34ca028000026d71df-us17",
	};
	const request = https.request(url, options, function (response) {
		response.on("data", function (data) {
			console.log(JSON.parse(data));
		});
	});
	request.write(jsonData);
	request.end();
});

app.listen(3000, function () {
	console.log("Jaa... jaa kr port 3000 pe dekh insaan aaya hai ki bhagwan");
});

// API Key
// 56c6592d8ce29e34ca028000026d71df-us17

// List ID
// a26566755d
