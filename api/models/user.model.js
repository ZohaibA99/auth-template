//create schema and model for user info. in our database
const mongoose = require('mongoose');

//schema -> describes the data our collection will hold and how it should appear
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "username already exists"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg",

    }
}, {timestamps: true});

//create the user model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User