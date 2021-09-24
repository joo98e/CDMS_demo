
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");

const myBatisMapper = require('mybatis-mapper');
const format = require('../config/MyBatisFormat');

router.get('/list', (req, res) => {

    const SQL = `SELECT * FROM tb_agcy WHERE delete_yn = 'N';`

    console.log(req.query);

    connection.query(SQL,
        (err, rows, fields) => {
            if (err) console.log(err);

            res.status(200).send(rows);
        }
    );
});

router.get('/category', (req, res) => {
    const params = req.query;
    myBatisMapper.createMapper(['./db/xml/Agency/Agency.xml']);

    const SQL = myBatisMapper.getStatement('Agency', 'getCategory', params, format);
    connection.query(SQL,
        (err, rows, fields) => {
            if (err) console.log(err);

            if (rows.length === 0) {
                return res.status(200).send({
                    result: {},
                    resultCode: -2,
                    resultMessage: '동작은 이루어졌으나 결과값이 없습니다.'
                });
            } else {
                return res.status(200).send({
                    result: rows,
                    resultCode: 1,
                    resultMessage: '완료'
                });
            }
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