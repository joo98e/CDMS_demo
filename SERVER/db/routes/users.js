
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");

router.get('/', (req, res) => {
    connection.query(
        "SELECT * FROM users;",
        (err, rows, fields) => {
            if(err) console.log(err);
            res.send(rows);
        }
    );
});

module.exports = router;