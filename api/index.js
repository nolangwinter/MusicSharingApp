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
mongoose.connect("mongodb+srv://nolangwinter:nolan@cluster1.8lnk49n.mongodb.net/", {
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

const User = require('./models/user');
const Post = require('./models/post');

app.post("/login", async (req, res) => {
    try {
        const {username, email} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            console.log("existing user");
            return res.status(200).json({message:"Existing User, successful Login"});
        }

        // create a new user
        const newUser = new User({username, email});

        console.log("newUser, ", newUser);

        //save the user to the backend
        await newUser.save();


        res.status(200).json({messgage:"New User Registration complete"});
    } catch(err) {
        console.log("Error registering user");
        res.status(500).json({message:"Error registering user"});
    }
})