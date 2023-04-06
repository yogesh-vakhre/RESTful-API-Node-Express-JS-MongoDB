require("dotenv").config();
require("./config/database").connect();

const express = require('express');
const app = require("./app");

app.use(express.json());

app.listen(8081, () => {
    console.log(`Server Started at ${8081}`)
})