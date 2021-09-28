
const express = require('express');
const router = express.Router();

const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Util/Util.xml']);
const format = require('../config/MyBatisFormat');

const connection = require("../db_connection");

router.get('/menu/info', (req, res) => {
    const params = req.query;
    const SQL = myBatisMapper.getStatement("Util", "getMenuInfo", params, format);
    console.log(params);
    console.log(SQL);


    connection.query(SQL,
        (err, rows, field) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    result: {},
                    resultCode: -1,
                    resultMessage: "실패"
                });
            }

            else {
                return res.status(200).send({
                    result: rows,
                    resultCode: 1,
                    resultMessage : "성공"
                });
            }
        });
    
});

module.exports = router;