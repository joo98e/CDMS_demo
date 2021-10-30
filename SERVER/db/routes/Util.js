const status = process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'prod' : 'dev';

const express = require('express');
const router = express.Router();
const request = require('request');
const requestIp = require('request-ip');
const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Util/Util.xml']);
const format = require('../config/MyBatisFormat');

const connection = require("../config/db_connection");

router.get('/menu/info', (req, res) => {
    const params = req.query;
    const SQL = myBatisMapper.getStatement("Util", "getMenuInfo", params, format);

    connection.query(SQL,
        (err, rows, field) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    result: {},
                    resultCode: -1,
                    resultMessage: "알 수 없는 오류"
                });
            }
            else {
                return res.status(200).send({
                    result: rows,
                    resultCode: 1,
                    resultMessage: "성공"
                });
            }
        });

});

router.get('/process/prod', (req, res) => {
    return res.status(200).send({
        result: status === 'prod' ? true : false,
        resultCode: 1,
        resultMessage: status === 'prod' ? "prod" : "dev"
    });
});

router.get("/getIp", (req, res) => {
    try {
        const IP = requestIp.getClientIp(req).substr(7);
        return res.status(200).send({
            result : IP,
            resultCode : 1,
            resultMessage : "성공"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            result : null,
            resultCode : -1,
            resultMessage : "실패"
        })
    }
});

module.exports = router;