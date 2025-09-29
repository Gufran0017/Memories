const User = require('../models/userModel');

const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({msg: "Email already exists"});
        const userCreated = await User.create({name, email, password});
        res.status(201).json({msg: "Registration successfull", token: await userCreated.generateToken()});
    }

    catch(error) {
        console.log("Registration server error!", error);
        res.status(500).json({msg: "Registration server error!"});
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const userExists = await User.findOne({email});
        if(!userExists) return res.status(400).json({msg: "Invalid credentials"});
        const isMatch = await userExists.comparePassword(password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
        res.status(201).json({msg: "Login successfull", token: await userExists.generateToken()});
    }

    catch(error) {
        console.log("Login server error!", error);
        res.status(500).json({msg: "Login server error!"});
    }
}

module.exports = { register, login };