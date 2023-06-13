const express = require("express");
const {Register,getAllAccount,Login} = require("../controllers/account.controller.js");
const accountRouter = express.Router();

accountRouter.post("/signup",Register);
accountRouter.get("/",getAllAccount);
accountRouter.post("/login",Login,)

module.exports = {
    accountRouter
}