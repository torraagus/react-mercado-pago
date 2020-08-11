require("dotenv").config();
const express = require("express");
const app = express();

const mercadopago = require("mercadopago");

app.use(express.json());
app.use(express.static(__dirname + "/build"));

mercadopago.configure({
	sandbox: true,
	access_token: process.env.ACCESS_TOKEN,
});

app.post("/procesar_pago", (req, res) => {
	let payment_data = req.body;

	mercadopago.payment
		.save(payment_data)
		.then((data) => {
			console.log(data, "-----> Data!!!");
			res.status(data.status).send(data.body);
		})
		.catch((error) => {
			console.log(error, "-----> Error!!!");
			res.status(500).send(error);
		});
});

app.listen(3000, function () {
	console.log("Server runnning on port 3000");
});
