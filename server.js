const express = require("express");
const authRoutes = require("./src/routes/auth");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

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

app.use(bodyParser.json());

app.use("/v1/auth", authRoutes);

mongoose
    .connect(
        "mongodb://RohmanM:ex04qnDKfp9k9k95@cluster0-shard-00-00.m7bvb.mongodb.net:27017,cluster0-shard-00-01.m7bvb.mongodb.net:27017,cluster0-shard-00-02.m7bvb.mongodb.net:27017/Users?ssl=true&replicaSet=atlas-12f0mw-shard-0&authSource=admin&retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`This server running on port : ${port}`);
            console.log("Connection to DB success");
        });
    })
    .catch((err) => {
        console.log(err);
        console.log("Connection to DB failed");
    });