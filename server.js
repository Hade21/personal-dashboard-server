const express = require("express");
const authRoutes = require("./src/routes/auth");
const bodyParser = require("body-parser");
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

app.listen(port, () => {
    console.log(`This server running on port : ${port}`);
});