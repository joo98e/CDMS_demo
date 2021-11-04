const express = require('express');
const router = express.Router();
const fnMail = require('../func/mail');
const connection = require("../config/db_connection");

router.post('/send', (req, res) => {

    try {
        fnMail();
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