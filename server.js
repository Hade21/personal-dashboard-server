const express = require("express");
const authRoutes = require("./src/routes/auth");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow_Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Header",
        "Content-Type, Accept, Authorization"
    );
    next();
});

app.use("/v1/auth", authRoutes);

mongoose
    .connect(
        "mongodb+srv://RohmanM:ex04qnDKfp9k9k95@cluster0.m7bvb.mongodb.net/Users?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`This server running on port : ${port}`);
            console.log("Connection to DB success");
        });
    })
    .catch((err) => {
        console.log(err);
    });