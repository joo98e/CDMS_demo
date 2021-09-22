
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");


router.get('/list', (req, res) => {
    
    const sql = `SELECT * FROM tb_agcy WHERE delete_yn = 'N';`

    console.log(req.query);
     
    connection.query(sql,
        (err, rows, fields) => {
            if (err) console.log(err);

            res.status(200).send(rows);
        }
    );
});

router.post('/add', (req, res) => {
    console.log(req.body);
    
});

module.exports = router;