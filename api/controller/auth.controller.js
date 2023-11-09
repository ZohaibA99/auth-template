const User = require('../models/user.model.js')
const bcryptjs = require('bcryptjs');

const signUp = async (req, res) => {
    const {username, email, password} = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashPassword});
    try{
        await newUser.save();
        res.status(201).json({message: `user created successfully`});
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

module.exports = signUp;