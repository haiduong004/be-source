const {Account} = require("../models");
const randToken = require('rand-token');
const dotenv = require("dotenv")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Register = async(req,res) => {
    try {
        const {userName,fullName,email,password} = req.body;

        const user = await Account.findOne({ where: { userName } });
        const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS = 10);
        if (!user) {
            if (userName && password){
                Account.create({
                    userName: userName,
                    fullName: fullName,
                    email: email,
                    password: hashPassword});
                res.status(201).send("Success register user account");
            } else {
                res.status(409).send('Invalid input, It maybe have other field to be null');
            }
        }
        else {
            res.status(409).send('This username has already existed');
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllAccount = async(req,res) => {
    try{
        const AccountList = await Account.findAll();
        res.status(200).send(AccountList);
    }catch (error){
        res.status(500).send(error)
    }
}

const Login = async(req,res) => {
    try {
        const {userName,password} = req.body;
        const user = await Account.findOne({ where: { userName } });
        if (!user) {
            res.status(401).send('Username does not exist');
        } else {
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (isPasswordValid) {
                const token = jwt.sign(
                    {fullName: user.fullName,
                    email: user.email},
                    'testToken',
                    {expiresIn: 60*60}
                );
                const fullName = user.fullName;
                const email = user.email;
                res.status(200).send({token,fullName,email});
            } else {
                res.status(401).send('Incorrect password');
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    Register,
    getAllAccount,
    Login
}