// these are all the dependencies that were added to package.json
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');

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

// tells the server to run on port 3000
app.listen(port, () => {
    console.log("Server is running on port 3000");
})

// initializing the User and Post Schema
const User = require('./models/user');
const Post = require('./models/post');

//generating the secret key
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
}

const secretKey = generateSecretKey();

// endpoint to login/register a user in the backend
app.post("/login", async (req, res) => {
    try {
        const {username, email, profilePic} = req.body;
        const existingUser = await User.findOne({email});
        console.log(existingUser);
        
        // if a user exists then permit a successful login
        if (existingUser) {
            console.log("existing user")
            const token = jwt.sign({userId: existingUser._id}, secretKey);
            console.log("existing user token", token);
            res.status(200).json({token});
        } else {
            // create a new user if user does not exist in the database
            const newUser = new User({username, email, profilePic});

            console.log("newUser, ", newUser);

            //save the user to the backend
            await newUser.save();

            const token = jwt.sign({userId: newUser._id}, secretKey);
            console.log("new user token", token);
            res.status(200).json({token});
        }

    } catch(err) {
        console.log("Error registering user");
        res.status(500).json({message:"Error registering user"});
    }
})

  // endpoint to get the user profile
  app.get("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if(!user) {
            res.status(404).json({message:"User not found"});
        }

        return res.status(200).json({user});
    } catch(error) {
        res.status(500).json({message:"error getting the user profile"});
    }
  })

  // endpoint to access all of the users except the logged in user
    app.get("/user/:userId", (req, res) => {
        try {
        const loggedInUserId = req.params.userId;

        User.find({ _id: { $ne: loggedInUserId } })
            .then((users) => {
            res.status(200).json(users);
            })
            .catch((error) => {
            console.log("Error: ", error);
            res.status(500).json("errror");
            });
        } catch (error) {
        res.status(500).json({ message: "error getting the users" });
        }
    });

    // endpoint to fetch all of the users that the logged in user is following
    app.get("/follow/:userId", (req, res) => {
        try {
        const loggedInUserId = req.params.userId;

        User.find({ followers: loggedInUserId })
            .then((users) => {
            res.status(200).json(users);
            })
            .catch((error) => {
            console.log("Error: ", error);
            res.status(500).json("errror");
            });
        } catch (error) {
        res.status(500).json({ message: "error getting the users" });
        }
    });

    //endpoint to follow a particular user 
  app.post("/follow", async (req, res) => {
    const {currentUserId, selectedUserId} = req.body;
    try {
        // adds the current user to the selected user's followers
        await User.findByIdAndUpdate(selectedUserId,{
            $push:{followers:currentUserId}
        });

        res.sendStatus(200);
    } catch(error) {
        console.log("error", error);
        res.status(500).json({message:"error following user"})
    }
  });

  // endpoint to unfollow a particular user
  app.post("/users/unfollow", async (req, res) => {
    const { loggedInUserId, targetUserId } = req.body;
  
    try {
      await User.findByIdAndUpdate(targetUserId, {
        $pull: { followers: loggedInUserId },
      });
  
      res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error unfollowing user" });
    }
  });