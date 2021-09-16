
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");

router.get('/', (req, res) => {

    const sql = `
    SELECT
        *
    FROM tb_depart_list 
    WHERE delete_yn = 'N';`

    connection.query(sql,
        (err, rows, fields) => {
            if (err) console.log(err);

            let result = rows;

            res.status(200).send(result);
        }
    )

});

module.exports = router;