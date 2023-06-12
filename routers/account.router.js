const express = require("express");
const authMiddleware = require("../middleware/auth.middleware.js");
const {Register,getAllAccount,Login} = require("../controllers/account.controller.js");
const accountRouter = express.Router();

accountRouter.post("/signup",Register);
accountRouter.get("/",getAllAccount);
accountRouter.post("/login",Login)

module.exports = {
    accountRouter
}