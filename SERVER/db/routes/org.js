
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");

router.get('/depart', (req, res) => {
    const sql = `
    SELECT
        id,
        name,
        code
    FROM tb_org_structure as structure
    WHERE structure.type= "TYPE::DEPART" 
    AND structure.delete_yn = 'N';`

    connection.query(sql,
        (err, rows, fields) => {
            if (err) console.log(err);

            let result = rows;
            res.status(200).send(result);
        }
    )
});

router.get('/rank', (req, res) => {
    const sql = `
    SELECT
        id,
        name,
        code
    FROM tb_org_structure as structure
    WHERE structure.type= "TYPE::RANK" 
    AND structure.delete_yn = 'N';`

    connection.query(sql,
        (err, rows, fields) => {
            if (err) console.log(err);

            let result = rows;
            res.status(200).send(result);
        }
    )
});

module.exports = router;