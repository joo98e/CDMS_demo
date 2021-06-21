
const express = require("express");
const bodyParser = require("body-parser");

module.exports = (() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // ────── Users profile
    app.use('/image', express.static('./Users/UsersProfile'));

    return app;
})(); 