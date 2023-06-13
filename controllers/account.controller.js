const {Account} = require("../models");
const dotenv = require("dotenv")
const bcrypt = require('bcrypt');

// const Register = async(req,res) => {
//     try {
//         const {userName,fullName,email,password} = req.body;
//         const newUser = await Account.create({userName,fullName,email,password});
//         res.status(201).send("Success register user account");
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

const Register = async(req,res) => {
    try {
        const {userName,fullName,email,password} = req.body;

        //kiểm tra tài khoản có tồn tại
        const user = await Account.findOne({ where: { userName } });
        const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS = 10);
        if (!user) {
            if (userName && password){
                const newUser = await Account.create({
                    userName: userName,
                    fullName: fullName,
                    email: email,
                    password: hashPassword});
                res.status(201).send("Success register user account");
            } else {
                res.status(409).send('Invalid input');
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
                const fullName = user.fullName;
                const email = user.email;
                res.status(200).send({userName,password,fullName,email});
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
