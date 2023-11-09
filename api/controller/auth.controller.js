const User = require('../models/user.model.js')
//password hashing
const bcryptjs = require('bcryptjs');

const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;
    //use a hashing algorithim in order to encrypt the users password
    //push that (now encrypted) password to the database
    const hashPassword = bcryptjs.hashSync(password, 10);
    //add new user to the database
    const newUser = new User({username, email, password: hashPassword});
    try{
        await newUser.save();
        res.status(201).json({message: `user created successfully`});
    }
    catch(error){
        next(error);
    }
}

module.exports = signUp;