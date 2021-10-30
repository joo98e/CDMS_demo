
const express = require('express');
const router = express.Router();

const connection = require("../config/db_connection");

router.get('/category', (req, res) => {
    const sql = `SELECT * FROM TB_PROJECT_CATEGORY`

    connection.query(sql, (err, rows, fields) => {
        if (err) console.error(err);
        
        res.status(200).send(rows);
    });
});

router.get('/', (req, res) => {
    const sql = `SELECT * FROM TB_PROJECT_LIST;`

    console.log(req.query);
     
    connection.query(sql,
        (err, rows, fields) => {
            if (err) console.log(err);

            res.status(200).send(rows);
        }
    )

});

module.exports = router;