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
		auth: "badri7489:3b49ee690b796efc72d03e8dab6cd3ba-us17",
	};
	const request = https.request(url, options, function (response) {
		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure.html");
		}

		response.on("data", function (data) {
			console.log(JSON.parse(data));
		});
	});
	request.write(jsonData);
	request.end();
});

app.post("/failure", function (req, res) {
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Jaa... jaa kr port 3000 pe dekh insaan aaya hai ki bhagwan");
});

// API Key
// 3b49ee690b796efc72d03e8dab6cd3ba-us17

// List ID
// a26566755d
