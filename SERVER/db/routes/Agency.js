
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");

const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Agency/Agency.xml']);
const format = require('../config/MyBatisFormat');

router.get('/list', (req, res) => {

    const params = req.query;
    const SQL = myBatisMapper.getStatement('Agency', 'getAgcyList', params, format);

    connection.query(SQL,
        (err, rows, fields) => {
            if (err) console.log(err);

            res.status(200).send(rows);
        }
    );
});

router.get('/getColleague', (req, res) => {

    // const params = req.params;

    // const SQL = myBatisMapper.getStatement('Agency', 'getAgcyList', params, format);

    // console.log(req.query);
    // res.send(true)

    const SQL = `SELECT * FROM tb_agcy WHERE delete_yn = 'N';`

    console.log(req.query);

    // connection.query(SQL,
    //     (err, rows, fields) => {
    //         if (err) console.log(err);

    //         res.status(200).send(rows);
    //     }
    // );
});

router.get('/category', (req, res) => {
    const params = req.query;

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
    const params = req.body;
    const SQL_AGENCY = myBatisMapper.getStatement('Agency', 'insertAgency', params, format);
    
    connection.query(SQL_AGENCY,
        (err, rows) => {
            if (err) {
                return res.status(500).send({
                    result: {},
                    resultCode: -1,
                    resultMessage: "예기치 못한 오류",
                })
            } else {
                if (Array.isArray(params.person) && params.person.length > 0) {
                    const params_sub = {
                        last_insert_id: rows.insertId,
                        IPv4 : params.IPv4,
                        person: params.person
                    };
                    const SQL_AGENCY_COLLEAGUE = myBatisMapper.getStatement('Agency', 'insertAgencyColleague', params_sub, format);

                    connection.query(SQL_AGENCY_COLLEAGUE,
                        (err, rows) => {
                            if (err) {
                                return res.status(500).send({
                                    result: {},
                                    resultCode: -1,
                                    resultMessage: "예기치 못한 오류"
                                });
                            } else {
                                return res.status(200).send({
                                    result: rows,
                                    resultCode: 1,
                                    resultMessage : "성공"
                                });
                            }
                        }
                    )
                } else {
                    return res.status(200).send({
                        result: rows,
                        resultCode: 1,
                        resultMessage : '기관 참여자를 제외하고 성공'
                    })
                }
            }
        }
    );


});

module.exports = router;