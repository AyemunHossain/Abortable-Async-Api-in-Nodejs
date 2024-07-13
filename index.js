"use strict";
const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const { executeQuery, AbortError } = require("./abortable");
const app = express();

app.get("/execute-query", async (req, res) => {
    const abortController = new AbortController();
    const { signal } = abortController;
    
    setTimeout(() => {
        abortController.abort();
    }, 5000); // Abort the query if it takes more than 5 seconds

    try {
        const result = await executeQuery(signal);
        res.json(result);
    } catch (err) {
        if (err.name === 'AbortError') {
            res.status(400).json({ message: "Query aborted due to timeout" });
        } else {
            console.log({err})
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    }
});

const credentials = {
    key: fs.readFileSync("ssl/private.key"),
    cert: fs.readFileSync("ssl/bundle.crt"),
    dhparam: fs.readFileSync("ssl/dh-strong.pem"),
    requestCert: true,
    rejectUnauthorized: false,
};

const server = https.createServer(credentials, app);

server.listen(3000, () => {
    console.log("Server running at https://localhost:3000/");
});
