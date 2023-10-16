// these are all the dependencies that were added to package.json
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

// connecting to the database
mongoose.connect("mongodb+srv://nolan:nolan@cluster0.54yw1rc.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
// after connecting
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB");
})

app.listen(port, () => {
    console.log("Server is running on port 3000");
})