const express = require("express");
const { accountRouter } = require("./account.router.js");
const rootRouter = express.Router();

rootRouter.use("/account",accountRouter);

module.exports = {
    rootRouter
}  