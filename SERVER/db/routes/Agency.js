
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

router.get('/category', (req, res) => {
    
    const sql = `SELECT * FROM tb_agcy_biz_area WHERE delete_yn = 'N';`
     
    connection.query(sql,
        (err, rows, fields) => {
            if (err) console.log(err);
            
            res.status(200).send(rows);
        }
    );
});

router.post('/add', (req, res) => {
    console.log(req.body);

    const SQL = `INSERT INTO tb_agcy (wrtier_seq, agency_manager_seq, name, desc, reg_date, upd_date, reg_ip, upd_ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const vars = [
        req.body.seq,
        req.body.seq,
        req.body.seq,
        req.body.seq,
        req.body.seq,
        req.body.seq,
        req.body.seq,
        req.body.seq,
    ]
    
});

module.exports = router;