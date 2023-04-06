require("dotenv").config();
require("./config/database").connect();

const express = require('express');
const app = require("./app");
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})