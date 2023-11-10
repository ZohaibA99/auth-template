const User = require('../models/user.model.js')
//password hashing
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error.js');
const jwt = require('jsonwebtoken');

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

const signIn = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        //check that the username provided is valid
        const validUser = await User.findOne({email: email})
        if (!validUser){
            return next(new errorHandler(401, 'Invalid Credentials'));
        }

        //now check the password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword){
            return next(new errorHandler(401, 'Invalid Credentials'));
        }
        const{password: hashPassword, ...userObj} = validUser._doc;
        //now if there are no errors with signup 
        //add a token to the cookie of the users browser 
        //(jwt) - jsonwebtoken 
        const token = jwt.sign({id: validUser._id}, process.env.SECRET_PHRASE);
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(userObj);
    }catch(e){
        next(error);
    }

} 
module.exports = {signUp,
                  signIn};