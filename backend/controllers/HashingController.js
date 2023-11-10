const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
//jwt secret
const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET_KEY, {expiresIn: '7d'});
}
// hashing
const Hashing = async (req, res) => {
    const {data} = req.body;
    try{
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data, salt);
        res.status(200).json({hash: hash});
    }catch(err){
        res.status(400).json({message: err.message});
    }
}   
// compare
const Compare = async (req, res) => {
    const {data, hash} = req.body;
    try{
        // hash password
        const match = await bcrypt.compare(data, hash);
        res.status(200).json({match: match});
    }catch(err){
        res.status(400).json({message: err.message});
    }
}
module.exports = {
    Login,
    Signup,
    GetAllUsers,
    GetUser,
    DeleteUser,
    UpdateUser,
}