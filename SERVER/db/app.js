const express = require("express");

module.exports = (() => {
    const app = express();

    // static, images
    app.use('/static', express.static('./uploads'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // ────── Users profile
    return app;
})(); 