
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");

const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Agency/Agency.xml']);
const format = require('../config/MyBatisFormat');

router.get('/list', (req, res) => {

    const condition = {
        mem_seq: req.query.mem_seq,
        status: req.query.status,
        srchType: req.query.srchType,
        delete_yn: req.query.delete_yn
    };
    const selectId = condition.srchType === "MINE" ? "getAgcyListSrchTypeMine"
        : condition.srchType === "ADMIN" ? "getAgcyListSrchTypeAdmin"
            : "getAgcyListSrchTypeBiz";

    const SQL = myBatisMapper.getStatement('Agency', selectId, condition, format);

    connection.query(SQL,
        (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    result: {},
                    resultCode: -1,
                    errorMsg: "알 수 없는 오류입니다."
                });
            };

            res.status(200).send({
                result: rows,
                resultCode: 1,
                resultMessage: "기관 리스트 불러오기 성공."
            });
        }
    );
});

router.get('/getColleague', (req, res) => {
    const condition = {
        agcy_id: req.query.agcy_id,
        delete_yn: req.query.delete_yn
    }
    const SQL = myBatisMapper.getStatement('Agency', 'getColleague', condition, format);

    connection.query(SQL,
        (err, rows, fields) => {
            if (err) {
                console.log(err)
                return res.status(400).send({
                    result: false,
                    resultCode: -1,
                    resultMessage: "기관 참여자 불러오기에 실패했습니다."
                })
            };

            return res.status(200).send({
                result: rows,
                resultCode: 1,
                resultMessage: "기관 참여자 불러오기에 성공했습니다."
            });
        }
    );
});

router.get('/category', (req, res) => {
    const params = req.query;

    const SQL = myBatisMapper.getStatement('Agency', 'getCategory', params, format);
    connection.query(SQL,
        (err, rows, fields) => {
            if (err) {
                console.log(err)
                return res.status(400).send({
                    result: false,
                    resultCode: -1,
                    resultMessage: "사업 구분 불러오기에 실패했습니다."
                })
            };

            if (rows.length === 0) {
                return res.status(200).send({
                    result: {},
                    resultCode: -2,
                    resultMessage: '사업 구분 불러오기에 성공했지만 결과값이 없습니다.'
                });
            } else {
                return res.status(200).send({
                    result: rows,
                    resultCode: 1,
                    resultMessage: '사업 구분 불러오기에 성공했습니다.'
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
                console.log(err);
                return res.status(400).send({
                    result: {},
                    resultCode: -1,
                    resultMessage: "(기관 생성)예기치 못한 오류",
                })
            } else {
                if (Array.isArray(params.person) && params.person.length > 0) {
                    const params_sub = {
                        last_insert_id: rows.insertId,
                        IPv4: params.IPv4,
                        person: params.person
                    };
                    const SQL_AGENCY_COLLEAGUE = myBatisMapper.getStatement('Agency', 'insertAgencyColleague', params_sub, format);

                    connection.query(SQL_AGENCY_COLLEAGUE,
                        (err, rows) => {
                            if (err) {
                                return res.status(400).send({
                                    result: {},
                                    resultCode: -1,
                                    resultMessage: "(기관 참여자 생성)예기치 못한 오류"
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
                        resultMessage: '기관 참여자를 제외하고 성공'
                    })
                }
            }
        }
    );
});

router.get('/detail', (req, res) => {
    const params = req.query;
    const SQL = myBatisMapper.getStatement("Agency", "getDetail", params, format);
    connection.query(SQL,
        (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    result: false,
                    resultCode: -1,
                    resultMessage: "기관 디테일 조회 실패"
                });
            } else {
                if (rows.length === 0) {
                    return res.status(200).send({
                        result: false,
                        resultCode: -1,
                        resultMessage: "잘못된 접근입니다."
                    });
                } else {
                    return res.status(200).send({
                        result: rows,
                        resultCode: 1,
                        resultMessage: "기관 디테일 조회 성공"
                    });
                }
                
            }
        });
});

module.exports = router;