"use strict";
const http = require("http");
const express = require("express");
const app = express();
const routes = require("./routes/publicRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
