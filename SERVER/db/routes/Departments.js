
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");

router.get('/', (req, res) => {
    // 회원가입시 필요한 정보들을 client에서 가져오면, 
    // 그것들을 DB에 넣는다.

    const sql = "SELECT * FROM TB_DEPART_LIST;"

    connection.query(sql,
        (err, rows, fields) => {
            if (err) console.log(err);

            let result = rows;

            res.status(200).send(rows);
        }
    )

});

module.exports = router;