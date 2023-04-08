## Node.js Rest APIs example with Express &amp; MongoDB

Express application generator [documentation](https://expressjs.com/en/starter/generator.html)

How to Authenticate Users and Implement CORS in Node.js Apps(https://www.freecodecamp.org/news/how-to-authenticate-users-and-implement-cors-in-nodejs-applications/)

How to Build a RESTful API Using Node, Express, and MongoDB(https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/)

## Installing Guide Express application generator and server.js file

### 1) Install Express application generator express --no-view --git 
`express --no-view --git restful-api-node-express-mongodb`

### 2) How to Install Dependencies
`npm install cors mongoose express  dotenv nodemon`

### 3) We can now create the  server.js files in the root directory of our project with this command and establish our Node.js server
`touch server.js`

### 4) Edit server.js files in the root directory of our project and put this code
```sh
require("dotenv").config();

const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const port = process.env.PORT || 5000;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
```
### 5) Our file, as you can see, requires various environment variables. If you haven't already, create a new .env file and add your variables before running the application.
```sh 
 PORT=4001 
 MONGO_URI= // Your database URI
 ```

### 6) Edit the scripts object in our package.json to look like the one below to start our server.
```sh 
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
### 7) Running project (Development)
`npm run dev`

### 8) We will create the model, middleware, and config directories and their files, for example, user.js, auth.js, database.js using the commands below.

```sh 
mkdir models middleware controllers config

touch config/database.js
```

### 9) Connect your mongodb Database code in config/database.js file.
 
```sh 
const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
```

### 10) Connect your mongodb Database code in server.js  file.

```sh 

require("./config/database").connect();

```

### 11) Setup your global routes file in app.js files.

#### Create default routes file for manage all routes 
` touch routes/index.routes.js`
#### Put this code in index.routes.js file
```sh 
var express = require("express");
var app = express();
var usersRouter = require("./users.routes");//users routes
 
app.use("/users", usersRouter);

module.exports = app;
```
#### Create users.routes.js file for manage all users routes 
` touch routes/users.routes.js`

#### Put this code in users.routes.js file
```sh 
var express = require('express');
var router = express.Router();

//Post Method
router.post('/', (req, res) => {
    res.send('Post API')
})

//Get all Method
router.get('/', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;
```

#### Define your global routes file and defualt application running route in app.js files.
```sh 
var indexRouter = require('./routes/index.routes');

//Setup all routes
app.use('/api/v1/', indexRouter); 

// Default page    
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to RESTful API"
  });
});

```

## Simple CRUD Express.js Featuring MongoDB
Basic simple example CRUD (Create,Read,Update,Delete) on Nodejs using framework Express JS featuring  with database MongoDB.

### 1) Clone project
`git clone https://gitlab.com/yogesh.vakhre.5057/restful-api-node-express-mongodb.git`

### 2) Go to root project
`cd restful-api-node-express-mongodb`

### 3) Setup Your mongodb url in .env file
`cp .env.example .env`
 
### 4) Install Package local
`npm install`
 
### 5) Running project (Development)
`npm run dev`

You can access via http://localhost:3005/

