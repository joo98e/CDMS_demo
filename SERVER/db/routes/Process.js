
const express = require('express');
const router = express.Router();
const getNow = require("../func/getNow");
const connection = require("../db_connection");
const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Process/Process.xml']);
const format = require('../config/MyBatisFormat');

router.post('/add', (req, res) => {
    const params = {
        ...req.body,
        reg_date: getNow(),
        upd_date: getNow()
    };
    const SQL_PROCESS = myBatisMapper.getStatement('Process', 'insertProcess', params, format);
    connection.query(SQL_PROCESS,
        (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    result: {},
                    resultCode: -1,
                    resultMessage: "(프로세스 생성)예기치 못한 오류",
                })
            } else {
                if (Array.isArray(params.subPerson) && params.subPerson.length > 0) {
                    const params_sub = {
                        ref_proj_id: params.ref_proj_id,
                        IPv4: params.IPv4,
                        subPerson: params.subPerson,
                        last_insert_id: rows.insertId,
                        reg_date: getNow(),
                        upd_date: getNow()
                    };
                    const SQL_PROCESS_COLLEAGUE = myBatisMapper.getStatement('Process', 'insertProcessColleague', params_sub, format);
                    connection.query(SQL_PROCESS_COLLEAGUE,
                        (err, rows) => {
                            if (err) {
                                return res.status(400).send({
                                    result: {},
                                    resultCode: -1,
                                    resultMessage: "(프로세스 참여자 생성)예기치 못한 오류"
                                });
                            } else {
                                if (!params.mainPerson || params.mainPerson === null || params.mainPerson === undefined) {
                                    return res.status(400).send({
                                        result: {},
                                        resultCode: -1,
                                        resultMessage: "(프로세스 참여자 생성)예기치 못한 오류"
                                    });
                                }
                                const params_main = {
                                    ...params.mainPerson,
                                    IPv4: params.IPv4,
                                    type: "TYPE::MAIN",
                                    last_insert_id: params_sub.last_insert_id,
                                    reg_date: getNow(),
                                    upd_date: getNow()
                                };
                                const SQL_PROCESS_COLG_MAIN = myBatisMapper.getStatement('Process', 'insertProcessColleagueMain', params_main, format);
                                connection.query(SQL_PROCESS_COLG_MAIN,
                                    (err, rows) => {
                                        if (err) {
                                            console.log(err);
                                            return res.status(400).send({
                                                result: {},
                                                resultCode: -1,
                                                resultMessage: "(프로세스 생성)주담당자 등록 오류",
                                            });
                                        } else {
                                            return res.status(200).send({
                                                result: {...rows, last_insert_id : params_sub.last_insert_id},
                                                resultCode: 1,
                                                resultMessage: "등록에 성공했습니다."
                                            });
                                        }
                                    }
                                )
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