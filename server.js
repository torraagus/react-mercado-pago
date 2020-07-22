require("dotenv").config();
const express = require("express");
const app = express();

const mercadopago = require("mercadopago");
const Axios = require("axios");

app.use(express.json())
app.use(express.static(__dirname + '/build'))

mercadopago.configure({
  sandbox: true,
  access_token: process.env.ACCESS_TOKEN,
});

app.get("/medios", function (req, res) {
  Axios.get(
    `https://api.mercadopago.com/v1/payment_methods?access_token=${process.env.ACCESS_TOKEN}`
  )
    .then((response) => res.status(response.status).send(response.data))
    .catch((err) => res.sendStatus(500).send(err));
});

app.listen(3000, function () {
  console.log("Server runnning on port 3000");
});
