
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");

router.get('/', (req, res) => {

    const sql = "SELECT * FROM TB_POLICY_CONTENT;"

    connection.query(sql,
        (err, rows, fields) => {
            if (err) console.log(err);

            let result = rows;

            res.status(200).send(result);
        }
    )

});

module.exports = router;