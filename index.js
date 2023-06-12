const express = require("express");
const app = express();
const path = require("path");
const {sequelize} = require('./models');
const { accountRouter } = require("./routers/account.router");
const { rootRouter } = require("./routers");
const cors = require('cors');

app.use(express.json());
app.use(cors());

const publicPathDirection = path.join(__dirname,"./publuc");
app.use(express.static(publicPathDirection));

app.use("/api/v1",rootRouter);

app.listen(5000,async() => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
})