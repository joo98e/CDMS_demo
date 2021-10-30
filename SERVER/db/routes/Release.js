
const express = require('express');
const router = express.Router();
const connection = require("../db_connection");
const format = require('../config/MyBatisFormat');
const myBatisMapper = require('mybatis-mapper');

myBatisMapper.createMapper(['./db/xml/Board/Board.xml']);

router.post("/test", (req, res) => {
    console.log(123);

    return res.send(true);
});

module.exports = router;