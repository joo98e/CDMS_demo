const express = require("express");

module.exports = (() => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // ────── Users profile
    return app;
})(); 