require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL

/*Setup mongoose database*/ 
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
/*END Setup mongoose database*/

const app = express();

app.use(express.json());

app.listen(8081, () => {
    console.log(`Server Started at ${8081}`)
})