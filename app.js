const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
	console.log(req.body.first_name);
	console.log(req.body.last_name);
	console.log(req.body.email);
	res.send("Posted Successfully");
});

app.listen(3000, function () {
	console.log("Jaa... jaa kr port 3000 pe dekh insaan aaya hai ki bhagwan");
});
