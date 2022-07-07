//modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//routers
const authRoutes = require("./src/routes/auth");
const notesRoutes = require("./src/routes/notes");

//config
const app = express();
const port = process.env.NODE_ENV || 4000;
const database =
  "mongodb://RohmanM:ex04qnDKfp9k9k95@cluster0-shard-00-00.m7bvb.mongodb.net:27017,cluster0-shard-00-01.m7bvb.mongodb.net:27017,cluster0-shard-00-02.m7bvb.mongodb.net:27017/Users?ssl=true&replicaSet=atlas-12f0mw-shard-0&authSource=admin&retryWrites=true&w=majority";

//CORS-handle
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

//routing-endpoint
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", notesRoutes);

//error-intercept
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//db-connect
require("./src/db/connection");

app.listen(port, () => {
  console.log(`Server running di ${port}`);
});
