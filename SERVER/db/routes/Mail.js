const express = require('express');
const router = express.Router();
const fnMail = require('../func/mail');
const connection = require("../db_connection");

const myBatisMapper = require('mybatis-mapper');
// myBatisMapper.createMapper(['./db/xml/Agency/Agency.xml']);
const format = require('../config/MyBatisFormat');

router.post('/send', (req, res) => {
    const params = req.body;
    try {
        fnMail(params._Tx, params._Rx, params._Subject, params._Content);
        return res.status(200).send({
            result: req.body,
            resultCode: 1,
            resultMessage: "발송 함수 실행됨"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            result: {},
            resultCode: -1,
            resultMessage: "발송 함수 실패, 알 수 없는 오류"
        });
    }
    
});

module.exports = router;