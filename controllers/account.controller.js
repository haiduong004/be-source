const {Account} = require("../models");

// const Register = async(req,res) => {
//     try {
//         const {userName,fullName,email,password} = req.body;
//         const newAccount = await Account.create({userName,fullName,email,password});
//         res.status(201).send(newAccount);
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

const Register = async(req,res) => {
    try {
        const {userName,fullName,email,password} = req.body;
        const newAccount = await Account.create({userName,fullName,email,password});
        res.status(201).send(newAccount);
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
            res.status(401).send('Tên đăng nhập không tồn tại.');
        } else {
            if (user.password == password) {
                const fullName = user.fullName;
                const email = user.email;
                res.status(200).send({userName,password,fullName,email});
            } else {
                res.status(401).send('Mật khẩu không chính xác.');
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