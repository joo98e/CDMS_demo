
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");
const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Project/Project.xml']);
const format = require('../config/MyBatisFormat');

router.post('/add', (req, res) => {
    const params = req.body;
    const SQL_PROJECT = myBatisMapper.getStatement('Project', 'insertProject', params, format);

    connection.query(SQL_PROJECT,
        (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    result: {},
                    resultCode: -1,
                    resultMessage: "(프로젝트 생성)예기치 못한 오류",
                })
            } else {
                if (Array.isArray(params.person) && params.person.length > 0) {
                    const params_sub = {
                        last_insert_id: rows.insertId,
                        IPv4: params.IPv4,
                        person: params.person
                    };
                    const SQL_PROJECT_COLLEAGUE = myBatisMapper.getStatement('Project', 'insertProjectColleague', params_sub, format);

                    connection.query(SQL_PROJECT_COLLEAGUE,
                        (err, rows) => {
                            if (err) {
                                return res.status(400).send({
                                    result: {},
                                    resultCode: -1,
                                    resultMessage: "(프로젝트 참여자 생성)예기치 못한 오류"
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
                        resultMessage: '프로젝트 참여자를 제외하고 성공'
                    })
                }
            }
        }
    );

});

router.get('/list', (req, res) => {
    const params = req.query;
    const SQL = myBatisMapper.getStatement("Project", "getProject", params, format);
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

router.get('/detail', (req, res) => {
    const params = req.query;
    const SQL = myBatisMapper.getStatement("Project", "getDetail", params, format);
    
    connection.query(SQL,
        (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    result: false,
                    resultCode: -1,
                    resultMessage: "프로젝트 디테일 조회 실패"
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
                        resultMessage: "프로젝트 디테일 조회 성공"
                    });
                }

            }
        });
});

module.exports = router;