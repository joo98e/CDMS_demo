
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");
const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Process/Process.xml']);
const format = require('../config/MyBatisFormat');
const { intlFormat } = require('date-fns');

router.post('/add', (req, res) => {
    const params = req.body;
    const SQL_PROJECT = myBatisMapper.getStatement('Process', 'insertProcess', params, format);

    connection.query(SQL_PROJECT,
        (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    result: {},
                    resultCode: -1,
                    resultMessage: "(프로세스 생성)예기치 못한 오류",
                })
            } else {
                if (Array.isArray(params.person) && params.person.length > 0) {
                    const params_sub = {
                        ref_agcy_id: params.ref_agcy_id,
                        IPv4: params.IPv4,
                        person: params.person
                    };
                    const SQL_PROJECT_COLLEAGUE = myBatisMapper.getStatement('Process', 'insertProcessColleague', params_sub, format);

                    connection.query(SQL_PROJECT_COLLEAGUE,
                        (err, rows) => {
                            if (err) {
                                return res.status(400).send({
                                    result: {},
                                    resultCode: -1,
                                    resultMessage: "(프로세스 참여자 생성)예기치 못한 오류"
                                });
                            } else {
                                return res.status(200).send({
                                    result: rows,
                                    resultCode: 1,
                                    resultMessage: "등록에 성공했습니다."
                                });
                            }
                        }
                    )
                } else {
                    return res.status(200).send({
                        result: rows,
                        resultCode: 1,
                        resultMessage: '프로세스 참여자를 제외하고 성공'
                    })
                }
            }
        }
    );

});

router.get('/colg', (req, res) => {
    const params = req.query;
    const SQL = myBatisMapper.getStatement("Process", "getColg", params, format);
    console.log(params);
    console.log(SQL);
    connection.query(SQL, (err, rows, fileds) => {
        if (err) {
            return res.status(400).send({
                result: false,
                resultCode: -1,
                resultMessage: "오류"
            });
        } else {
            if (rows.length === 0) {
                return res.status(200).send({
                    result: rows,
                    resultCode: 1,
                    resultMessage: "결과값이 없습니다."
                });
            } else {
                return res.status(200).send({
                    result: rows,
                    resultCode: 1,
                    resultMessage: "성공"
                });
            }
        }
    });
});

router.get('/newcolg', (req, res) => {
    const params = req.query;
    const SQL = myBatisMapper.getStatement("Process", "getNewColg", params, format);

    connection.query(SQL, (err, rows, fileds) => {
        if (err) {
            return res.status(400).send({
                result: false,
                resultCode: -1,
                resultMessage: "오류"
            });
        } else {
            if (rows.length === 0) {
                return res.status(200).send({
                    result: rows,
                    resultCode: 1,
                    resultMessage: "결과값이 없습니다."
                });
            } else {
                return res.status(200).send({
                    result: rows,
                    resultCode: 1,
                    resultMessage: "성공"
                });
            }
        }
    });
});
module.exports = router;