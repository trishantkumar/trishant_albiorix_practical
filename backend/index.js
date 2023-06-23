const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');
const user = require('./routes/user.route');


// initialize our express app
const app = express();

var cors = require('cors')
app.use(cors())
// Set up mongoose connection
const mongoose = require('mongoose');
let mongoDB = database.db;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users', user);

let port = 1234;
app.listen(port, () => {
    console.log('listening on port ', + port);
});