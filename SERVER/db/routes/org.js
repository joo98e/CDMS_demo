
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");

const getNow = require("../func/getNow");
const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Organize/Org.xml']);
const format = require('../config/MyBatisFormat');

// ──────────────────────────────────────────────── 부서
router.get('/depart', (req, res) => {
    const SQL = `
    SELECT
        id,
        name,
        code
    FROM tb_org_structure as structure
    WHERE structure.type= "TYPE::DEPART" 
    AND structure.delete_yn = 'N';`

    connection.query(SQL,
        (err, rows, fields) => {
            if (err) console.log(err);

            let result = rows;
            res.status(200).send(result);
        }
    )
});

// ──────────────────────────────────────────────── 직급 
router.get('/rank', (req, res) => {
    const SQL = `
    SELECT
        id,
        name,
        code
    FROM tb_org_structure as structure
    WHERE structure.type= "TYPE::RANK" 
    AND structure.delete_yn = 'N';`

    connection.query(SQL,
        (err, rows, fields) => {
            if (err) console.log(err);

            let result = rows;
            res.status(200).send(result);
        }
    );
});

// ──────────────────────────────────────────────── 인력
router.post('/person', (req, res) => {

    const params = req.body;

    const SQL = myBatisMapper.getStatement('Org', 'getInternalPerson', params, format);

    connection.query(SQL, (err, rows, fields) => {
        if (err) {
            console.error(err);
            return res.status(400).send({
                result: {},
                resultCode: -1,
                errorMsg: "에러입니다."
            });
        } else {
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
    });
});

module.exports = router;