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
            return next(errorHandler(401, 'Invalid Credentials'));
        }

        //now check the password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword){
            return next(errorHandler(401, 'Invalid Credentials'));
        }
        //now if there are no errors with signup 
        //add a token to the cookie of the users browser 
        //(jwt) - jsonwebtoken 
        const token = jwt.sign({id: validUser._id}, process.env.SECRET_PHRASE);
        const{password: hashedPassword, ...userObj} = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000) //1 hour
        res
            .cookie('access_token', token, {httpOnly: true, 
                expiresIn: expiryDate})
            .status(200)
            .json(userObj);
    }catch(e){
        next(e);
    }
} 

const google = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id:user._id},  process.env.SECRET_PHRASE);
            const{password: hashedPassword, ...rest} = user._doc;
            const expiryDate = new Date(Date.now() + 3600000) //1 hour
            res
            .cookie('access_token', token, {httpOnly: true, 
                expires: expiryDate})
                 .status(200)
            .json(rest);
        }else{
            const generatedPassword = Math.random().toString(36)
                .slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User(
                                        {username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(), 
                                        email: req.body.email,
                                        password: hashedPassword,
                                        profilePicture: req.body.photo}
                                    );
            
            await newUser.save();
            const token = jwt.sign({id:newUser._id}, process.env.SECRET_PHRASE);
            const {password: hashedPassword2, ...rest} = newUser._doc;
            const expiryDate = new Date(Date.now + 3600000); //1 hour
            res.cookie('access_token', token, {
                httpOnly: true,
                expiresIn: expiryDate,
            }).status(200)
            .json(rest);
        }
    }catch(e){
        next(e);
    }
}
module.exports = {signUp,
                  signIn,
                  google};