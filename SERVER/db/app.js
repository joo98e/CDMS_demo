const express = require("express");

module.exports = (() => {
    const app = express();

    // static, images
    app.use('/static', express.static('./uploads'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((err, req, res, next) => {
        res.status(404).send("Sorry, Can't find that.");
    });

    app.use((err, req, res, next) => {
        res.status(500).send("Something broke.");
    });

    app.use((err, req, res, next) => {
        res.status(504).send("Bae request.");
    });

    // ────── Users profile
    return app;
})(); 